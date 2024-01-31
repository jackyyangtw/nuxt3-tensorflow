
import type { version } from 'vue';
<template>
<div class="grid w-full max-w-sm items-center gap-1.5">
    <label
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        for="picture"
    >
        Upload Picture
    </label>
    <div class="border-dashed border-2 border-gray-500 rounded-lg p-4 text-center text-gray-500">
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
    <img
        
        ref="imgRef"
        alt="Uploaded Image"
        class=" aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
    />
</div>
</template>

<script setup>
const {$model} = useNuxtApp()

const imgRef = ref(null)
const emit = defineEmits(['getPrediction'])
const handleFileChange = async (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = async () => {
        const img = reader.result;
        if (!$model) {
            console.error('Model is not loaded yet');
            return;
        }
        if(imgRef.value) {
            imgRef.value.src = img;
            // 等待圖片載入
            await imgRef.value.decode();
            const predictions = await $model.classify(imgRef.value);
            console.log(predictions)
            // 比較 predictions 中每個物件的 probability，取出最大值
            // const { className: prediction } = predictions.reduce((a, b) => (a.probability > b.probability) ? a : b);
            emit('getPrediction', predictions)
        }
    }
}



</script>
