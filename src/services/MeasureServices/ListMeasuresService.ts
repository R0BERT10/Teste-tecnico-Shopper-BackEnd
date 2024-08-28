import { MeasureTypes } from "../../@types/EnumMeasureTypes"
import Measure from "../../entities/Measure"
import IMeasureRepository from "../../repositories/IMeasureRepository"
import Result from "../../util/ResultClassHandle"
import { ServerError } from "../../util/ResultServerErrors"

type Data = {
    customerCode: string,
    measure_type?: MeasureTypes
}

export default class ListMeasuresService {
    constructor(
        private repository: IMeasureRepository
    ) { }

    async execute(data: Data): Promise<Result<Measure[]>> {
        try {
            return await this.repository.read({
                customer_code: data.customerCode,
                measure_type: data.measure_type
            })
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`Falha ao recuperar medições:${err.message}`, `ListMeasuresService: execute(${data})`))
        }
    }
}