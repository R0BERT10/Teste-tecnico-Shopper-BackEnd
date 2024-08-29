import "reflect-metadata"
import "dotenv/config";
import express from "express"
import cors from "cors"
import { AppDataSource } from "./database/data-source"
import measureRouter from "./routes";
import ImageProcessProviderGeminiLLM from "./providers/implementations/ImageProcessingGeminiLLM";
import GoogleAIFileManagerProvider from "./providers/implementations/GoogleAIFileManagerProvider";
import base64Image from "./testeImages";

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
fileManager.getFiles().then((v) => {
    console.log(v)
})
const imageProcess = new ImageProcessProviderGeminiLLM(fileManager)
imageProcess.uploadImage(base64Image).then(() => {
    imageProcess.describeImage().then((result) => {
        if (result.isSuccess) {
            console.log(`"${result.getValue()}"`)
        } else {
            console.log(result.getError())
        }
    })
})