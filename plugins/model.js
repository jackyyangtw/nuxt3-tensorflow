// import * as tf from "@tensorflow/tfjs";
// import * as mobilenet from "@tensorflow-models/mobilenet";
// import * as cocoSsd from "@tensorflow-models/coco-ssd";
// // import * as qna from "@tensorflow-models/qna";
// export default defineNuxtPlugin(async (nuxtApp) => {
//     // const {$tf} = nuxtApp
//     await tf.ready();

//     // load mobilenet model
//     const MOBILENET = await mobilenet.load({
//         version: 2,
//         alpha: 1.0,
//     });

//     // load cocoSsd model
//     const COCOSSD = await cocoSsd.load();

//     // load resnet50 model
//     // const model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/resnet50_v1/model.json')

//     // load qna model
//     // const QNA = await qna.load();

//     return {
//         provide: {
//             MOBILENET,
//             COCOSSD,
//             // QNA,
//         },
//     };
// });

export default defineNuxtPlugin(async (nuxtApp) => {});
