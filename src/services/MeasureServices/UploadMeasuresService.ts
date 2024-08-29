import { MeasureTypes } from "../../@types/EnumMeasureTypes"
import Measure from "../../entities/Measure"
import IMeasureRepository from "../../repositories/IMeasureRepository"
import Result from "../../util/ResultClassHandle"
import ServerError from "../../util/ResultServerErrors"

type Data = {
    image: string,
    customer_code: string,
    measure_datetime: Date,
    measure_type: MeasureTypes
}

export default class UploadMeasuresService {
    constructor(
        private repository: IMeasureRepository
    ) { }

    async execute(data: Data): Promise<Result<Measure>> {
        try {


            const measure = new Measure()
            measure.customer_code = data.customer_code
            measure.measure_datetime = data.measure_datetime
            measure.measure_type = data.measure_type
            return await this.repository.create(measure)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`Falha ao registrar medição:${err.message}`, `UploadMeasuresService: execute(${data})`))
        }
    }
}