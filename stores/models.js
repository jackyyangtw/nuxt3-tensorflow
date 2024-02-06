import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as qna from "@tensorflow-models/qna";
import * as deeplab from "@tensorflow-models/deeplab";

// tsfjs models
export let MOBILENET = null;
export let COCOSSD = null;
export let QNA = null;
export let DEEPLAB = null;
export let TF = tf;

export const useModelsStore = defineStore("models", {
    state: () => ({
        isMOBILENETLoaded: false,
        isCOCOSSDLoaded: false,
        isQNALoaded: false,
        isTfReady: false,
        isDEEPLABLoaded: false,
    }),
    actions: {
        async setupTf() {
            if (this.isTfReady) return;
            await tf.setBackend("webgl");
            await tf.ready();
            TF = tf;
            this.isTfReady = true;
        },
        async loadMobileNet() {
            if (this.isMOBILENETLoaded) return;
            MOBILENET = await mobilenet.load({
                version: 2,
                alpha: 1.0,
            });
            this.isMOBILENETLoaded = true;
        },
        async loadCocoSsd() {
            if (this.isCOCOSSDLoaded) return;
            COCOSSD = await cocoSsd.load();
            this.isCOCOSSDLoaded = true;
        },
        async loadQNA() {
            if (this.isQNALoaded) return;
            QNA = await qna.load();
            this.isQNALoaded = true;
        },
        async loadDeepLab() {
            if (DEEPLAB) return;
            DEEPLAB = await deeplab.load({
                base: "pascal",
                quantizationBytes: 2,
            });
            this.isDEEPLABLoaded = true;
        },
    },
});
