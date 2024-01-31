import * as tf from '@tensorflow/tfjs'
import * as mobilenet  from '@tensorflow-models/mobilenet'
export default defineNuxtPlugin(async nuxtApp => {
    await tf.ready();
    const model = await mobilenet.load({
        version: 2,
        alpha: 1.0,
    })
    return {
        provide: {
            model
        }
    }
})