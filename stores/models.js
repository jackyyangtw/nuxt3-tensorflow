import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as qna from "@tensorflow-models/qna";
import * as deeplab from "@tensorflow-models/deeplab";

// tsfjs models
let MOBILENET = null;
let COCOSSD = null;
let QNA = null;
let DEEPLAB = null;
let TF = tf;

export const useModelsStore = defineStore("models", {
    state: () => ({
        isMOBILENETLoaded: false,
        isCOCOSSDLoaded: false,
        isQNALoaded: false,
        isTfReady: false,
        isDEEPLABLoaded: false,
    }),
    getters: {
        MOBILENET() {
            if (!this.isMOBILENETLoaded) return null;
            return MOBILENET;
        },
        COCOSSD() {
            if (!this.isCOCOSSDLoaded) return null;
            return COCOSSD;
        },
        QNA() {
            if (!this.isQNALoaded) return null;
            return QNA;
        },
        DEEPLAB() {
            if (!this.isDEEPLABLoaded) return null;
            return DEEPLAB;
        },
        TF() {
            if (!this.isTfReady) return null;
            return TF;
        },
    },
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
