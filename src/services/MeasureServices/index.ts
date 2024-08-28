import IMeasureRepository from "../../repositories/IMeasureRepository"
import MeasureRepositoryPostgres from "../../repositories/implementations/MeasureRepositoryPostgres"
import ConfirmMeasuresService from "./ConfirmMeasuresService"
import ListMeasuresService from "./ListMeasuresService"
import UploadMeasuresService from "./UploadMeasuresService"

const repository: IMeasureRepository = new MeasureRepositoryPostgres()

export default function MeasureServices() {
    return {
        upload: new UploadMeasuresService(repository),
        list: new ListMeasuresService(repository),
        confirm: new ConfirmMeasuresService(repository)
    }
}