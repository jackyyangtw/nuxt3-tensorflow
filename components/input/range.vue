<template>
    <div class="range-input relative mb-10 w-full">
        <label>{{ label }}</label>
        <input
            type="range"
            class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            :min="min"
            :max="max"
            :value="number"
            @input="handleInput"
        />
        <span
            class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6"
            >{{ min }}</span
        >
        <!-- <span
            class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
            >$500</span
        >
        <span
            class="text-sm text-gray-500 dark:text-gray-400 absolute start-2/3 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6"
            >$1000</span
        > -->
        <span
            class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6"
            >{{ max }}</span
        >
    </div>
</template>

<script setup lang="ts">
const number = defineModel();
const emit = defineEmits(["update:modelValue"]);
const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = Number(target.value);
    emit("update:modelValue", value);
};
defineProps({
    min: {
        type: Number,
        default: -100,
    },
    max: {
        type: Number,
        default: 100,
    },
    label: {
        type: String,
        default: "亮度",
    },
});
</script>
