<template>
    <div>
        <textarea
            v-model="text"
            cols="30"
            rows="10"
            placeholder="輸入要翻譯的內容"
        ></textarea>
        <select v-model="target">
            <option value="zh-TW">中文</option>
            <option value="en">英文</option>
        </select>
        <button @click="translateText">翻譯</button>
        <p>翻譯結果: <br />{{ translation }}</p>
    </div>
</template>

<script setup>
import { ref } from "vue";

const text = ref("");
const target = ref("zh-TW");
const translation = ref("");

const translateText = async () => {
    const response = await $fetch("/api/translate", {
        method: "POST",
        body: { text: text.value, target: target.value },
    });
    translation.value = response;
};
</script>
