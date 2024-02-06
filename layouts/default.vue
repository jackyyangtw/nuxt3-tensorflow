<template>
    <TheHeader />
    <div class="container mx-auto pt-5">
        <slot />
    </div>
</template>

<script setup>
useHead({
    bodyAttrs: {
        class: "bg-gray-100",
    },
});
</script>
