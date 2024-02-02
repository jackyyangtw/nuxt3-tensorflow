<template>
    <form action="" @submit.prevent="handleQuestion">
        <div class="space-y-8">
            <div class="space-y-2">
                <h2 class="text-3xl font-bold"
                    >我可以依照您輸入的文章內容回答問題</h2
                >
            </div>
            <div class="space-y-4">
                <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="article"
                    >
                        您需要提問的文章
                    </label>
                    <textarea
                        v-model="passage"
                        class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[200px]"
                        id="article"
                        placeholder="輸入需要提問的文章"
                    ></textarea>
                </div>
                <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="question"
                    >
                        有什麼問題想問我嗎？
                    </label>
                    <input
                        v-model="question"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="question"
                        placeholder="輸入問題"
                    />
                </div>
                <button
                    class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    Submit
                </button>
            </div>
        </div>
    </form>
    <div v-if="fetchedResults">{{ fetchedResults }}</div>
    <div v-if="answers">{{ answers }}</div>
</template>

<script setup>
import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";

let QNA = null;
const passage = ref(
    `US Senator Tom Cotton repeatedly asked Shou Zi Chew, the CEO of Chinese-owned social media app TikTok, about his links to the Chinese Communist Party, despite Mr Chew repeatedly asserting that he is Singaporean at a hearing in Washington DC on Wednesday.In this minute-long exchange, Mr Cotton asks Mr Chew about his citizenship, passport and whether he is a member of the CCP, to which he replies "Senator, I'm Singaporean. No."TikTok is owned by Chinese company ByteDance.Mr Chew denies his company has ever shared or received a request to share US users data with the Chinese government.`
);
const question = ref("");
const answers = ref(null);

const fetchedResults = ref(null);

const targetLanguage = computed(() => "zh-TW");

const translateText = async (enteredText, targetLang = "en") => {
    const response = await $fetch("/api/translate", {
        method: "POST",
        body: { text: enteredText, target: targetLang },
    });
    return response;
};

const handleQuestion = async () => {
    answers.value = null;
    if (!QNA) return;
    const translatedQuestion = await translateText(question.value);
    const result = await QNA.findAnswers(translatedQuestion, passage.value);
    if (result.length === 0) {
        fetchedResults.value = "No answers found";
        return;
    }
    fetchedResults.value = result;
    const highScoreAnswer = result.reduce((prev, current) =>
        prev.score > current.score ? prev : current
    ).text;
    const translatedAnswer = await translateText(
        highScoreAnswer,
        targetLanguage.value
    );
    answers.value = translatedAnswer;
};

onMounted(async () => {
    await tf.ready();
    QNA = await qna.load();
});
</script>
