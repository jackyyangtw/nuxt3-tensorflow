import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as qna from "@tensorflow-models/qna";
// import { defineStore } from "pinia";

export const useModelStore = defineStore("model", {
    state: () => ({
        mobilenet: null,
        cocoSsd: null,
        qna: null,
    }),
    actions: {
        async setupTf() {
            await tf.setBackend("webgl");
            await tf.ready();
        },
        async loadMobileNet() {
            this.mobilenet = await mobilenet.load({
                version: 2,
                alpha: 1.0,
            });
        },
        async loadCocoSsd() {
            this.cocoSsd = await cocoSsd.load();
        },
        async loadQna() {
            this.qna = await qna.load();
        },
    },
});
