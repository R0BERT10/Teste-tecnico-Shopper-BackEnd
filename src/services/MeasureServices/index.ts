import IFileManagerProvider from "../../providers/IFileManagerProvider"
import IImageProcessingProvider from "../../providers/IImageProcessingProvider"
import GeminiAIFileManagerProvider from "../../providers/implementations/GeminiAIFileManagerProvider"
import ImageProcessProviderGeminiLLM from "../../providers/implementations/ImageProcessingGeminiLLM"
import IMeasureRepository from "../../repositories/IMeasureRepository"
import InMemoryMeasureRepository from "../../repositories/implementations/InMemoryMeasureRepository"
import MeasureRepositoryPostgres from "../../repositories/implementations/MeasureRepositoryPostgres"
import ConfirmMeasuresService from "./ConfirmMeasuresService"
import ListMeasuresService from "./ListMeasuresService"
import UploadMeasuresService from "./UploadMeasuresService"

const repository: IMeasureRepository = new InMemoryMeasureRepository()
const fileMenage: IFileManagerProvider = new GeminiAIFileManagerProvider()
const imageProcess: IImageProcessingProvider = new ImageProcessProviderGeminiLLM(fileMenage)

export default function MeasureServices() {
    return {
        upload: new UploadMeasuresService(repository, imageProcess),
        list: new ListMeasuresService(repository),
        confirm: new ConfirmMeasuresService(repository)
    }
}