<template>
    <div>圖像分類 </div>
    <LoadingModel v-if="isLoadingModel" />
    <ImgDragZone v-else @imgLoaded="handleImgLoaded" />
    <div v-if="results">{{ highScore }}</div>
</template>

<script setup lang="ts">
import { useModelsStore } from "@/stores/models";
import { type MobileNet } from "@/types/mobilenet.d";

const modelsStore = useModelsStore();
const { loadMobileNet, setupTf } = modelsStore;
const { MOBILENET } = storeToRefs(modelsStore);

const isLoadingModel = ref(true);
onMounted(async () => {
    await setupTf();
    await loadMobileNet();
    isLoadingModel.value = false;
});

const results = ref<MobileNet[] | null>(null);
const handleImgLoaded = async (imgRef: Ref<HTMLImageElement>) => {
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
