<template>
    <TheHeader />
    <div class="container mx-auto py-10">
        <slot />
    </div>
</template>

<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: "bg-gray-100",
    },
});
</script>
