<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<script setup>
await import("@tensorflow/tfjs-backend-cpu");
await import("@tensorflow/tfjs-backend-webgl");
</script>
