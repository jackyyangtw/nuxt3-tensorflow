<template>
    <div>
        <h1>Home</h1>
        <DragInput @getPrediction="handlePrediction"/>
        <ul>
            <li v-for="result in results" :key="result">
                {{ result.className }}: {{ result.probability }}
            </li>
        </ul>
    </div>
</template>

<script setup>
const results = ref(null)
const handlePrediction = (prediction) => {
    console.log(prediction)
    results.value = prediction
}
</script>