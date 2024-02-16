<template>
    <header
        class="flex justify-between items-center h-20 px-6 bg-white dark:bg-gray-900"
    >
        <div class="container mx-auto flex">
            <nuxt-link class="flex items-center mr-5" to="/">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="h-6 w-6"
                >
                    <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
                </svg>
                <span class="sr-only">Acme Inc</span>
            </nuxt-link>
            <nav class="flex space-x-8">
                <nuxt-link
                    v-for="link in links"
                    :key="link.url"
                    :to="link.url"
                    class="text-gray-900 dark:text-gray-100"
                >
                    {{ link.title }}
                </nuxt-link>
            </nav>
        </div>
    </header>
</template>

<script setup>
const links = [
    { title: "圖像識別", url: "/image-recognition" },
    { title: "圖像分類", url: "/image-classification" },
    { title: "聊天", url: "/chat" },
    { title: "圖像編輯", url: "/image-edit" },
];
</script>

<style scoped>
.router-link-active {
    @apply dark:text-amber-500 font-extrabold;
}
</style>
