<template>
    <h1 class="text-4xl font-bold text-center mb-8">圖像識別</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-10 text-center"
        >上傳一張圖片，我們將識別其中的物體。</p
    >
    <LoadingModel v-if="loadingModel" />
    <div class="flex pt-10" v-else>
        <ImgDragZone @imgLoaded="predictImage">
            <template #prediction>
                <Transition name="fade">
                    <div v-if="predictComplete">
                        <div
                            v-for="dimension in objectDimensions"
                            :key="dimension.score"
                        >
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
                                    {{ dimension.class }} -
                                    {{ dimension.score }}%
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </template>
        </ImgDragZone>
        <Transition name="fade-right">
            <div
                v-if="results"
                class="precictions pl-10 w-1/2 mx-auto relative pt-5"
            >
                <h2 class="text-2xl font-bold pb-5 flex">
                    <figure class="w-8 mr-3">
                        <img src="/ai-icon.png" alt="" />
                    </figure>
                    <span>識別結果</span>
                </h2>
                <div v-if="objectNames.length > 0">
                    這張圖片中有以下物體：
                    <span v-for="(name, index) in objectNames" :key="name">
                        {{ name }}
                        <span v-if="index !== objectNames.length - 1">、</span>
                    </span>
                </div>
                <p v-else>目前沒有識別到物體</p>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useModelsStore } from "@/stores/models";
import { type CocoSSD } from "@/types/cocoSSD.d";

const modelsStore = useModelsStore();
const { loadCocoSsd, setupTf } = modelsStore;
const { COCOSSD } = storeToRefs(modelsStore);

const loadingModel = ref(true);
onMounted(async () => {
    await setupTf();
    await loadCocoSsd();
    loadingModel.value = false;
});

const results = ref<CocoSSD[] | null>(null);
const predictComplete = ref(false);
const predictImage = async (imgRef: Ref<HTMLImageElement>) => {
    results.value = null;
    predictComplete.value = false;
    if (!imgRef.value || !COCOSSD.value) {
        console.error("Model is not loaded or image is not ready");
        return;
    }
    const COCOSSD_Predictions = await COCOSSD.value.detect(imgRef.value);
    predictComplete.value = true;
    results.value = COCOSSD_Predictions;
};

const objectNames = computed(() => {
    if (results.value) {
        const names = results.value.map((prediction) => prediction.class);
        return names;
    }
    return [];
});

const objectDimensions = computed(() => {
    if (results.value) {
        const Dimensions = results.value.map((prediction) => {
            return {
                left: prediction.bbox[0],
                top: prediction.bbox[1],
                width: prediction.bbox[2],
                height: prediction.bbox[3],
                class: prediction.class,
                score: (prediction.score * 100).toFixed(1),
            };
        });
        return Dimensions;
    }
    return [];
});
</script>

<style>
.fade-right-enter-active,
.fade-right-leave-active {
    transition: 0.5s;
}

.fade-right-enter-from,
.fade-right-leave-to {
    opacity: 0;
    transform: translateX(-50px);
}

.fade-enter-active,
.fade-leave-active {
    transition: 1s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
