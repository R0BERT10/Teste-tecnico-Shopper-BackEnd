import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { CustomTempFile } from "../../util/TempFiles";
import IFileManagerProvider from "../IFileManagerProvider";
import IImageProcessingProvider from "../IImageProcessingProvider";
import Result from "../../util/ResultClassHandle";
import ServerError from "../../util/ResultServerErrors";

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) { throw Error("A variável de ambiente GEMINI_API_KEY é necessitaria.") }

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type ImageParams = {
    uri: string,
    tempPath: string,
    base64: string,
    mimeType: string
}

export default class ImageProcessProviderGeminiLLM implements IImageProcessingProvider {
    private imageParams?: ImageParams
    constructor(private fileManager: IFileManagerProvider) { }
    async uploadImage(inlineDate: string): Promise<Result<string>> {
        const tempFile = new CustomTempFile("genAi", "jpeg")
        tempFile.uploadTempImageForBase64(inlineDate)
        const tempFilePath = tempFile.getFilePath()

        const result = await this.fileManager.uploadImage(tempFilePath, "image/jpeg")
        if (result.isFailure) {
            return Result.fail(result.getError())
        }
        this.imageParams = {
            uri: this.fileManager.getUri(),
            tempPath: tempFilePath,
            base64: inlineDate,
            mimeType: this.fileManager.getMimeType()
        }
        return Result.ok(result.getValue())
    }
    async describeImage(): Promise<Result<string>> {
        try {
            const response = await this.akyToGemini("Qual o valor da medição? Retorne apenas o valor.")
            return Result.ok(response)
        } catch (error) {
            return Result.fail(ServerError.IMAGE_PROCESSING(`ImageProcessProviderGeminiLLM: describeImage()$error:${error}`))
        }
    }

    async akyToGemini(prompt: string): Promise<string> {
        console.log(this.imageParams)
        const result = await model.generateContent([
            {
                fileData: {
                    mimeType: this.imageParams?.mimeType!!,
                    fileUri: this.imageParams?.uri!!
                }
            },
            { text: prompt },
        ]);
        console.log(result.response)
        return result.response.text()
    }
}
