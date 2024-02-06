<template>
    <LoadingModel v-if="loadingModel" />
    <div
        v-else
        class="grid w-full max-w-3xl items-center gap-1.5 mx-auto relative"
    >
        <div
            class="z-20 dragzone border-dashed border-4 rounded-lg p-10 flex flex-col justify-center items-center cursor-pointer hover:border-blue-500"
            :class="{
                'border-blue-500': imageSrc,
                'border-gray-200': !imageSrc,
            }"
            @dragover.prevent
            @dragleave.prevent
            @drop.prevent="handleFileDrop"
            @click="fileInputClick"
        >
            <input
                type="file"
                class="hidden"
                @input="handleFiles"
                accept="image/*"
                ref="fileInput"
            />
            <p v-if="!imageSrc"
                >拖拽圖片到這裡或者
                <span class="text-blue-500 underline">點擊上傳</span></p
            >
            <figure class="relative" v-if="imageSrc">
                <img
                    ref="imgRef"
                    :src="imageSrc"
                    class="max-w-full mt-4"
                    alt="圖片預覽"
                    @load="predictImage"
                />
                <div v-for="dimension in objectDimensions" :key="dimension">
                    <div
                        class="absolute bg-green-700/[0.5]"
                        :style="{
                            left: dimension.left + 'px',
                            top: dimension.top - 50 + 'px',
                            width: dimension.width + 'px',
                            height: dimension.height + 'px',
                        }"
                    >
                        <div
                            class="absolute w-full bg-orange-400/[0.8] p-1 text-xs text-white"
                        >
                            {{ dimension.class }} - {{ dimension.score }}%
                        </div>
                    </div>
                </div>
            </figure>
        </div>
        <div
            class="glass-effect z-10 w-full h-full rounded-lg p-4 overflow-y-auto shadow-lg absolute top-0 left-0"
            :style="{
                backdropFilter: 'blur(50px)',
            }"
        >
        </div>
        <div
            class="dominant-Color w-full h-full rounded-lg p-4 overflow-y-auto absolute top-0 left-0"
            :style="{
                // backgroundColor: dominantColor,
                // backgroundImage: `linear-gradient(45deg, ${dominantColor}, transparent)`,
                backgroundImage: `url(${imageSrc})`,
            }"
        >
            <!-- 你的內容 -->
        </div>
    </div>
</template>

<script setup>
import { MOBILENET, COCOSSD } from "@/stores/models";
import { useModelsStore } from "@/stores/models";
import ColorThief from "colorthief";

const modelsStore = useModelsStore();
const { loadMobileNet, loadCocoSsd, setupTf } = modelsStore;

const imgRef = ref(null);
const results = ref(null);
const loadingModel = ref(true);

onMounted(async () => {
    await setupTf();
    await loadMobileNet();
    await loadCocoSsd();
    loadingModel.value = false;
});

const fileInput = ref(null);
const imageSrc = ref(null); // 新增一個 ref 來儲存圖片的 URL

const handleFileDrop = (event) => {
    const files = event.dataTransfer.files;
    handleFiles(files);
};

const fileInputClick = () => {
    fileInput.value.click();
};

const handleFiles = async (files) => {
    results.value = null;
    if (!imageSrc) return;
    // 檢查是否有文件被上傳
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
            // 使用 FileReader 來讀取文件
            const reader = new FileReader();

            reader.onload = async (e) => {
                imageSrc.value = e.target.result; // 將讀取到的結果賦值給 imageSrc，以顯示圖片
            };
            reader.readAsDataURL(file); // 讀取文件
        } else {
            // 如果上傳的不是圖片文件，可以在這裡處理錯誤或顯示提醒
            alert("請上傳圖片文件！");
        }
    }
};

const dominantColor = ref(null);
const extractColor = (imgRef) => {
    const colorThief = new ColorThief();
    const colors = colorThief.getColor(imgRef);
    dominantColor.value = `rgb(${colors.join(",")},0.5)`;
};

const predictImage = async () => {
    if (!imgRef.value || !MOBILENET || !COCOSSD) {
        console.error("Model is not loaded or image is not ready");
        return;
    }
    // 執行預測的邏輯
    const MOBILENET_Predictions = await MOBILENET.classify(imgRef.value);
    const { className: MOBILENET_Prediction } = MOBILENET_Predictions.reduce(
        (a, b) => (a.probability > b.probability ? a : b)
    );
    const COCOSSD_Predictions = await COCOSSD.detect(imgRef.value);
    extractColor(imgRef.value);

    results.value = {
        MOBILENET_Prediction,
        COCOSSD_Predictions,
    };
};

const objectDimensions = computed(() => {
    if (results.value) {
        const Dimensions = results.value.COCOSSD_Predictions.map(
            (prediction) => {
                return {
                    left: prediction.bbox[0],
                    top: prediction.bbox[1],
                    width: prediction.bbox[2],
                    height: prediction.bbox[3],
                    class: prediction.class,
                    score: (prediction.score * 100).toFixed(1),
                };
            }
        );
        return Dimensions;
    }
    return [];
});
</script>
