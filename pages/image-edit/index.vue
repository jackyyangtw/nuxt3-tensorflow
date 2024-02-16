<template>
    <LoadingModel v-if="!isModelLoaded" />
    <ImgDragZone v-else @imgLoaded="handleImage" />
    <div class="py-10">{{ output }}</div>
    <div class="flex">
        <canvas ref="canvasRef"></canvas>
        <div class="mb-6 w-full" v-if="canvasLoaded">
            <InputRange
                v-model="brightnessAdjustment"
                @update:modelValue="adjustBrightnessOnInput"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { useModelsStore } from "@/stores/models";

const modelsStore = useModelsStore();
const { loadDeepLab, setupTf } = modelsStore;
const { DEEPLAB, TF } = storeToRefs(modelsStore);

const isModelLoaded = ref(false);
onMounted(async () => {
    await setupTf();
    await loadDeepLab();
    isModelLoaded.value = true;
});

const output = ref<string | null>(null);

const brightnessAdjustment = ref(0); // 初始化亮度調整值
const imgRefGlobal = ref<HTMLImageElement | null>(null); // 用於保存最近一次加載的圖片引用
const canvasLoaded = ref(false);
async function handleImage(imgRef: Ref<HTMLImageElement>): Promise<void> {
    output.value = null;
    if (DEEPLAB.value && imgRef.value) {
        const res = await DEEPLAB.value.segment(imgRef.value);
        output.value = res.legend;
        imgRefGlobal.value = imgRef.value; // 保存圖片引用
        await adjustBrightness(imgRef.value, brightnessAdjustment.value); // 使用初始亮度調整值
        canvasLoaded.value = true;
    }
}

const canvasRef = ref<HTMLCanvasElement | null>(null);
async function adjustBrightness(
    imgElement: HTMLImageElement | Ref<HTMLImageElement>,
    adjustment: number
): Promise<void> {
    const element = (imgElement as Ref<HTMLImageElement>).value
        ? (imgElement as Ref<HTMLImageElement>).value
        : (imgElement as HTMLImageElement);
    if (element && canvasRef.value && TF.value.browser) {
        canvasRef.value.width = element.width;
        canvasRef.value.height = element.height;
        const ctx = canvasRef.value.getContext("2d");
        if (ctx) {
            ctx.drawImage(element, 0, 0, element.width, element.height);
        }
        // 自動釋放在其回調函數中創建的所有張量的內存
        TF.value.tidy(() => {
            // 將圖片像素轉換成張量，對張量的每一個通道進行亮度調整
            let tensor = TF.value.browser.fromPixels(canvasRef.value).toFloat();
            let adjustmentTensor = TF.value.scalar(adjustment).toInt();
            // 對張量進行亮度調整
            tensor = tensor.add(adjustmentTensor).clipByValue(0, 255).toInt();
            // 將調整後的張量轉換回畫布
            TF.value.browser.toPixels(tensor, canvasRef.value);
        });
    }
}
// 當範圍輸入改變時調用的函數
function adjustBrightnessOnInput() {
    if (imgRefGlobal.value) {
        adjustBrightness(imgRefGlobal.value, brightnessAdjustment.value);
    }
}

watch(brightnessAdjustment, (newVal) => {
    if (imgRefGlobal.value) {
        adjustBrightness(imgRefGlobal.value, newVal);
    }
});
</script>
