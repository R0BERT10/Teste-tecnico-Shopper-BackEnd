import Result from "../util/ResultClassHandle"

export default interface IImageProcessingProvider {
    uploadImage(inlineDate: string): Promise<Result<string>>
    describeImage(): Promise<Result<string>>
}