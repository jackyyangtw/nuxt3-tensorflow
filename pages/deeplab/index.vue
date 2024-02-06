<template>
    <LoadingModel v-if="!isModelLoaded" />
    <img class="max-w-2xl" ref="imgRef" src="" alt="" @load="predict" />
</template>

<script setup>
import { useModelsStore } from "@/stores/models";
import { DEEPLAB } from "@/stores/models";
const modelsStore = useModelsStore();
const { loadDeepLab, setupTf } = modelsStore;
const isModelLoaded = ref(false);
const imgRef = ref(null);
onMounted(async () => {
    await setupTf();
    await loadDeepLab();
    isModelLoaded.value = true;
    imgRef.value.src = "/dog.jpg";
});

const predict = async () => {
    const output = await DEEPLAB.segment(imgRef.value);
    console.log(output.legend);
};
</script>
