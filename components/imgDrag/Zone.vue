<template>
    <div
        class="drag-zone grid w-full max-w-3xl items-center gap-1.5 mx-auto relative transition-all duration-300"
    >
        <div
            class="z-20 dragzone border-dashed border-4 rounded-lg p-10 flex flex-col justify-center items-center cursor-pointer hover:border-blue-500 transition-all duration-300"
            :class="{
                'border-blue-500': imgSrc,
                'border-gray-200': !imgSrc,
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
            <p v-if="!imgSrc"
                >拖拽圖片到這裡或者
                <span class="text-blue-500 underline">點擊上傳</span></p
            >

            <figure class="relative">
                <img
                    v-if="imgSrc"
                    ref="imgRef"
                    :src="imgSrc || ''"
                    class="max-w-full mt-4 shadow-lg bg-white rounded-lg"
                    alt="圖片預覽"
                    @load="imgLoadedHandler"
                />
                <slot name="prediction"></slot>
            </figure>
        </div>
        <div
            class="glass-effect z-10 w-full h-full rounded-lg p-4 overflow-y-auto shadow-lg absolute top-0 left-0 backdrop-blur-2xl"
        >
        </div>
        <div
            class="dominant-Color w-full h-full rounded-lg p-4 overflow-y-auto absolute top-0 left-0"
            :style="{
                background: imgSrc
                    ? `center / cover no-repeat url(${imgSrc})`
                    : 'none',
            }"
        >
        </div>
    </div>
</template>

<script setup>
const fileInput = ref(null);

const imgRef = ref(null);
const imgSrc = ref(null);

const emit = defineEmits(["imgLoaded"]);

const handleFileDrop = (event) => {
    handleFiles(event.dataTransfer.files);
};

const handleFiles = (payload) => {
    if (!imgSrc) return;

    let files = payload;
    if (payload instanceof Event) {
        files = payload.target.files;
    }

    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith("image/")) {
            // 使用 FileReader 來讀取文件
            const reader = new FileReader();

            reader.onload = (e) => {
                imgSrc.value = e.target.result; // 將讀取到的結果賦值給 imgSrc，以顯示圖片
            };
            reader.readAsDataURL(file); // 讀取文件
        } else {
            // 如果上傳的不是圖片文件，可以在這裡處理錯誤或顯示提醒
            alert("請上傳圖片文件！");
        }
    }
};

const imgLoadedHandler = () => {
    emit("imgLoaded", imgRef);
};

const fileInputClick = () => {
    fileInput.value.click();
};
</script>
