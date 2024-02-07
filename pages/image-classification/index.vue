<template>
    <div>圖像分類 </div>
    <LoadingModel v-if="isLoadingModel" />
    <ImgDragZone v-else @imgLoaded="handleImgLoaded" />
    <div v-if="results">{{ highScore }}</div>
</template>

<script setup>
import { useModelsStore } from "@/stores/models";

const modelsStore = useModelsStore();
const { loadMobileNet, setupTf } = modelsStore;
const { MOBILENET } = storeToRefs(modelsStore);

const isLoadingModel = ref(true);
onMounted(async () => {
    await setupTf();
    await loadMobileNet();
    isLoadingModel.value = false;
});

const results = ref(null);
const handleImgLoaded = async (imgRef) => {
    results.value = await MOBILENET.value.classify(imgRef.value);
};
const highScore = computed(() => {
    if (!results.value) return;
    return results.value.reduce((acc, cur) => {
        if (cur.probability > acc.probability) {
            return cur;
        }
        return acc;
    });
});
</script>
