import "reflect-metadata"
import "dotenv/config";
import express from "express"
import cors from "cors"
import { AppDataSource } from "./database/data-source"
import measureRouter from "./routes";
import ImageProcessProviderGeminiLLM from "./providers/implementations/ImageProcessingGeminiLLM";
import GoogleAIFileManagerProvider from "./providers/implementations/GeminiAIFileManagerProvider";
import base64ImageExamples from "./testeImages";

const app = express()
app.use(cors())
app.use(express.json())
app.use(measureRouter)

//AppDataSource.initialize().then(async () => {
//    console.log("Database OK")
//    app.listen(3000, () => {
//        console.log("Server OK")
//    }
//    )
//})
const fileManager = new GoogleAIFileManagerProvider()
//fileManager.getFiles().then((v) => {
//    console.log(v)
//})
base64ImageExamples.forEach((image64) => {
    const imageProcess = new ImageProcessProviderGeminiLLM(fileManager)
    imageProcess.uploadImage(image64.base64Image).then(() => {
        imageProcess.describeImage().then((result) => {
            if (result.isSuccess) {
                const value = +result.getValue().replace(/\n/g, '')
                if (isNaN(value)) {
                    imageProcess.describeImage().then((result) => {
                        console.log(result.getError())
                    })
                }
                console.log(`${image64.imagePath}"${value}"`)
            } else {
                console.log(result.getError())
            }
        })
    })
})