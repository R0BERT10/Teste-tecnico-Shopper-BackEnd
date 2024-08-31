import "dotenv/config";
import { GenerateContentResult, GoogleGenerativeAI } from "@google/generative-ai";
import { CustomTempFile } from "../../util/TempFiles";
import IFileManagerProvider from "../IFileManagerProvider";
import IImageProcessingProvider from "../IImageProcessingProvider";
import Result from "../../util/ResultClassHandle";
import ServerError from "../../util/ResultServerErrors";

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) { throw Error("A variável de ambiente GEMINI_API_KEY é necessitaria.") }

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: process.env.GEMINI_MODEL || "gemini-1.5-flash" });

const PROMPT_DESCRIBER_IMAGE = "What is the measurement value? Return only the value. Only integers. Only m³, do not consider dm³."

type ImageParams = {
    uri?: string,
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
        const mimeType = "image/jpeg"
        let uri: string | undefined
        const result = await this.fileManager.uploadImage(tempFilePath, mimeType)
        if (result.isSuccess) {
            uri = this.fileManager.getUri()
        }
        this.imageParams = {
            uri,
            tempPath: tempFilePath,
            base64: inlineDate,
            mimeType
        }
        return Result.ok(uri)
    }

    async describeImage(): Promise<Result<string>> {
        try {
            const response = await this.akyToGemini(PROMPT_DESCRIBER_IMAGE)
            return Result.ok(response)
        } catch (error) {
            return Result.fail(ServerError.IMAGE_PROCESSING(`ImageProcessProviderGeminiLLM: describeImage()$error:${error}`))
        }
    }

    async akyToGemini(prompt: string): Promise<string> {
        let result: GenerateContentResult
        if (this.imageParams?.uri) {
            result = await model.generateContent([
                {
                    fileData: {
                        fileUri: this.imageParams?.uri!!,
                        mimeType: this.imageParams?.mimeType!!
                    }
                },
                { text: prompt },
            ]);
        } else {
            result = await model.generateContent([
                {
                    inlineData: {
                        data: this.imageParams?.base64!!,
                        mimeType: this.imageParams?.mimeType!!
                    }
                },
                { text: prompt }
            ])
        }
        return result.response.text()
    }
}
