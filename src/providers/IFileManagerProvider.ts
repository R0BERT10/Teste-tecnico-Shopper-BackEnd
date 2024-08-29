import Result from "../util/ResultClassHandle"

export default interface IFileManagerProvider {
    uploadImage(filePath:string, mimeType:string): Promise<Result<string>>
    getUri(): string
    getDisplayName(): string
    getMimeType(): string
}