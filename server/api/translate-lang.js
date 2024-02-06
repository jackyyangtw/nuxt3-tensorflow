import * as GCT from "@google-cloud/translate";
const { Translate } = GCT.v2;

export default defineEventHandler(async (event) => {
    const translate = new Translate({
        projectId: "nuxt3-tensorflow",
        key: "AIzaSyAUYJjTWC5tjAKVDx8ySByorqELeOp9Ksg",
    });

    try {
        let [languages] = await translate.getLanguages();
        return languages;
    } catch (error) {
        return { error: error.message };
    }
});
