<template>
    <div class="grid w-full max-w-3xl items-center gap-1.5">
        <label
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            for="picture"
        >
            Upload Picture
        </label>
        <div
            class="border-dashed border-2 border-gray-500 rounded-lg p-4 text-center text-gray-500"
        >
            <p>Drag &amp; Drop your image here</p>
            <p>or</p>
            <input
                @input="handleFileChange"
                class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                id="picture"
                accept="image/*"
                type="file"
            />
        </div>
        <figure
            class="border border-gray-200 relative dark:border-gray-800 rounded-lg"
        >
            <img
                ref="imgRef"
                alt="Uploaded Image"
                class="aspect-square object-cover w-full rounded-lg overflow-hidden"
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
        <div v-if="results">
            <div>class: {{ results.MOBILENET_Prediction }}</div>
            <ul>
                <li v-for="result in results.COCOSSD_Predictions" :key="result">
                    {{ result }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
// const { $MOBILENET, $COCOSSD } = useNuxtApp();
import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
// import { useModelStore } from "~/stores/models";
// const userStore = useModelStore();
// const { mobilenet, cocoSsd } = storeToRefs(userStore);

// onMounted(async () => {
//     await userStore.setupTf();
//     await userStore.loadMobileNet();
//     await userStore.loadCocoSsd();
// });

const imgRef = ref(null);
const results = ref(null);
const emit = defineEmits(["getPrediction"]);

let $MOBILENET = null;
let $COCOSSD = null;
onMounted(async () => {
    await tf.ready();
    $MOBILENET = await mobilenet.load();
    $COCOSSD = await cocoSsd.load();
});

const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
        const img = reader.result;
        if (!$MOBILENET || !$COCOSSD) {
            console.error("Model is not loaded yet");
            return;
        }
        if (imgRef.value) {
            imgRef.value.src = img;
            // 等待圖片載入
            await imgRef.value.decode();

            // mobileNetV2
            const MOBILENET_Predictions = await $MOBILENET.classify(
                imgRef.value
            );
            // 比較 predictions 中每個物件的 probability，取出最大值
            const { className: MOBILENET_Prediction } =
                MOBILENET_Predictions.reduce((a, b) =>
                    a.probability > b.probability ? a : b
                );

            // cocoSsd
            const COCOSSD_Predictions = await $COCOSSD.detect(imgRef.value);
            results.value = {
                MOBILENET_Prediction,
                COCOSSD_Predictions,
            };
            emit("getPrediction", {
                MOBILENET_Prediction,
                COCOSSD_Predictions,
            });
        }
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
