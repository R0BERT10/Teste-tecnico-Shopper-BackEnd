import "dotenv/config";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import IFileManagerProvider from "../IFileManagerProvider";
import Result from "../../util/ResultClassHandle";
import ServerError from "../../util/ResultServerErrors";


const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) { throw Error("A variável de ambiente GEMINI_API_KEY é necessitaria.") }
const fileManager = new GoogleAIFileManager(apiKey);

type FileParams = {
    uri?: string,
    displayName?: string,
    mimeType?: string,
    name?: string
}

export default class GeminiAIFileManagerProvider implements IFileManagerProvider {
    private fileMeta?: FileParams

    async uploadImage(filePath: string, mimeType: string): Promise<Result<string>> {
        try {
            const uploadResponse = await fileManager.uploadFile(filePath, {
                displayName: filePath,
                mimeType
            })
            const file = uploadResponse.file
            this.fileMeta = {
                uri: file.uri,
                displayName: file.displayName,
                mimeType: file.mimeType,
                name: file.name
            }
            return Result.ok(file.uri)
        } catch (error) {
            return Result.fail(ServerError.IMAGE_UPLOAD(
                `GeminiAIFileManagerProvider: uploadImage(${filePath}, ${mimeType})$error:${error}`
            ))
        }
    }
    getUri(): string {
        const uri = this.fileMeta?.uri
        if (!uri) { throw Error("FileMeta not defined") }
        return uri
    }
    getDisplayName(): string {
        const displayName = this.fileMeta?.displayName
        if (!displayName) { throw Error("FileMeta not defined") }
        return displayName
    }
    getMimeType(): string {
        const mimeType = this.fileMeta?.mimeType
        if (!mimeType) { throw Error("FileMeta not defined") }
        return mimeType
    }

    async getFiles() {
        return fileManager.listFiles()       
    }
}