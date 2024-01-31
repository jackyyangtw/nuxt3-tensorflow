import * as tf from '@tensorflow/tfjs'
import * as mobilenet  from '@tensorflow-models/mobilenet'
import * as cocoSsd from '@tensorflow-models/coco-ssd'
export default defineNuxtPlugin(async (nuxtApp) => {
    await tf.ready();

    // load mobilenet model
    const MOBILENET = await mobilenet.load({
        version: 2,
        alpha: 1.0,
    })

    // load cocoSsd model
    const COCOSSD = await cocoSsd.load();

    // load resnet50 model
    // const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/resnet50_v1/model.json')

    return {
        provide: {
            MOBILENET,
            COCOSSD
        }
    }
})