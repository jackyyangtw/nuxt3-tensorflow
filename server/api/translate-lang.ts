import * as GCT from "@google-cloud/translate";
const { Translate } = GCT.v2;

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig();
    const GC_API_KEY = runtimeConfig.GC_API_KEY;
    const translate = new Translate({
        projectId: "nuxt3-tensorflow",
        key: GC_API_KEY,
    });

    try {
        let [languages] = await translate.getLanguages();
        return languages;
    } catch (error: any) {
        return { error: error.message };
    }
});
