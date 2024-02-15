import * as GCT from "@google-cloud/translate";
const { Translate } = GCT.v2;

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();
    const GC_API_KEY = runtimeConfig.GC_API_KEY;
    const { text, target } = await readBody(event);
    const translate = new Translate({
        projectId: "nuxt3-tensorflow",
        key: GC_API_KEY,
    });

    try {
        let [translations]: any = await translate.translate(text, target);
        translations = Array.isArray(translations)
            ? translations
            : [translations];
        return translations[0];
    } catch (error: any) {
        return { error: error.message };
    }
});
