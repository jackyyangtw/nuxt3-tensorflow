import * as GCT from "@google-cloud/translate";
const { Translate } = GCT.v2;

export default defineEventHandler(async (event) => {
    const { text, target } = await readBody(event);
    const translate = new Translate({
        projectId: "nuxt3-tensorflow",
        key: "AIzaSyAUYJjTWC5tjAKVDx8ySByorqELeOp9Ksg",
    });

    try {
        let [translations] = await translate.translate(text, target);
        translations = Array.isArray(translations)
            ? translations
            : [translations];
        // return translations.map(
        //     (translation, i) => `${text[i]} => (${target}) ${translation}`
        // );
        return translations[0];
    } catch (error) {
        return { error: error.message };
    }
});
