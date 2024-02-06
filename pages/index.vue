<template>
    <section class="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div class="container px-4 md:px-6">
            <div class="flex flex-col justify-center space-y-4 text-center">
                <div class="space-y-2">
                    <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl"
                        >Welcome to our AI Project</h1
                    >
                    <p
                        class="max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
                    >
                        Explore the amazing features of our project, including
                        image recognition and Q&amp;A functionality.
                    </p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10">
                    <div class="flex flex-col items-center space-y-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-12 w-12 text-black-900 dark:text-black-100"
                        >
                            <rect
                                width="18"
                                height="18"
                                x="3"
                                y="3"
                                rx="2"
                                ry="2"
                            ></rect>
                            <circle cx="9" cy="9" r="2"></circle>
                            <path
                                d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
                            ></path>
                        </svg>
                        <h3 class="text-lg font-semibold">Image Recognition</h3>
                        <p class="text-sm text-gray-500 dark:text-gray-400"
                            >Identify objects in your images.</p
                        >
                    </div>
                    <div class="flex flex-col items-center space-y-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="h-12 w-12 text-black-900 dark:text-black-100"
                        >
                            <path
                                d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"
                            ></path>
                            <path
                                d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"
                            ></path>
                            <path d="M12 17h.01"></path>
                        </svg>
                        <h3 class="text-lg font-semibold"
                            >Q&amp;A Functionality</h3
                        >
                        <p class="text-sm text-gray-500 dark:text-gray-400"
                            >Get answers to your questions.</p
                        >
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
