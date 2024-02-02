<template>
    <div>
        <h1>Home</h1>
        <div v-if="loadingModel">Loading..</div>
        <div v-else>
            <DragZone @getPrediction="handlePrediction" />
        </div>
    </div>
</template>

<script setup>
const { $MOBILENET, $COCOSSD } = useNuxtApp();
// import { useModelStore } from "~/stores/models";
// const userStore = useModelStore();
// const { mobilenet, cocoSsd } = storeToRefs(userStore);

const loadingModel = ref(true);

// onMounted(async () => {
//     await userStore.setupTf();
//     await userStore.loadMobileNet();
//     await userStore.loadCocoSsd();
//     watchEffect(async () => {
//         if (mobilenet.value && cocoSsd.value) {
//             loadingModel.value = false;
//         }
//     });
// });

watchEffect(async () => {
    if ($MOBILENET && $COCOSSD) {
        loadingModel.value = false;
    }
});

const results = ref(null);
const handlePrediction = (prediction) => {
    console.log(prediction);
    results.value = prediction;
};
</script>
