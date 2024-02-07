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
                    to="/image-recognition"
                    class="text-gray-900 hover:underline dark:text-gray-100"
                >
                    圖像識別
                </nuxt-link>
                <nuxt-link
                    to="/image-classification"
                    class="text-gray-900 hover:underline dark:text-gray-100"
                >
                    圖像分類
                </nuxt-link>
                <nuxt-link
                    to="/chat"
                    class="text-gray-900 hover:underline dark:text-gray-100"
                >
                    聊天
                </nuxt-link>
            </nav>
        </div>
    </header>
</template>

<script setup></script>
