import IMeasureRepository from "../../repositories/IMeasureRepository"
import MeasureRepositoryPostgres from "../../repositories/implementations/MeasureRepositoryPostgres"
import ConfirmMeasuresService from "./confirmMeasuresService"
import ListMeasuresService from "./listMeasuresService"
import UploadMeasuresService from "./uploadMeasuresService"

const repository: IMeasureRepository = new MeasureRepositoryPostgres()

export default function MeasureServices() {
    return {
        upload: new UploadMeasuresService(repository),
        list: new ListMeasuresService(repository),
        confirm: new ConfirmMeasuresService(repository)
    }
}