<template>
    <div>
        <h1>Home</h1>
        <DragInput @getPrediction="handlePrediction"/>
        <p>{{ result }}</p>
    </div>
</template>

<script setup>
const result = ref(null)
const handlePrediction = (prediction) => {
    console.log(prediction)
    result.value = prediction
}
</script>