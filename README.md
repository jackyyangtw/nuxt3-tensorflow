# CORS

-   https://israynotarray.com/nuxt/20230808/2129825058/
-   https://stackoverflow.com/questions/76198151/nuxt-3-how-to-implement-cors

# tensorflowjs 的模型

-   https://www.tensorflow.org/js?hl=zh-tw

# tensorflowjs mobilenet (圖片分類)

-   https://www.npmjs.com/package/@tensorflow-models/mobilenet

# tesnorflowjs coco-ssd (物件偵測)

-   https://github.com/tensorflow/tfjs-models/tree/master/coco-ssd
-   DEMO: https://tensorflow-js-object-detection.glitch.me/

# 模型比較

| 特徵/模型 | MobileNet | ResNet | Inception |
| **設計目的** | 高效能、低資源消耗 | 解決深層網絡訓練困難問題（梯度消失）| 提高網絡深度和寬度，同時保持計算資源合理 |
| **主要應用** | 移動設備、嵌入式系統 | 廣泛的圖像分類和識別任務 | 複雜的圖像識別任務，如圖像搜索和照片分類 |
| .. | | ... | ... |

# Server 載入模型或是 Client 載入模型

| 比較維度     | 服務器端加載模型                                                                           | 客戶端加載模型                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| **優點**     | - 性能和穩定性較高<br>- 兼容性好，不需擔心客戶端設備差異<br>- 有助於保護商業秘密和用戶數據 | - 提供即時反饋，減少網絡延遲<br>- 減輕服務器負擔<br>- 支持離線功能                                       |
| **缺點**     | - 可能增加延遲<br>- 運營成本較高<br>- 大量並發請求可能需更多服務器資源                     | - 受限於客戶端設備的計算能力和存儲空間<br>- 可能存在兼容性和性能問題<br>- 模型直接暴露給用戶，有泄露風險 |
| **適用情況** | - 模型較大，計算複雜<br>- 需要保護模型不被用戶直接訪問                                     | - 模型較小，對即時反饋要求高<br>- 用戶設備相對現代                                                       |
