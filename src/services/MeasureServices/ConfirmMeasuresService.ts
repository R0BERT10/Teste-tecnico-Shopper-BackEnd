import Measure from "../../entities/Measure"
import IMeasureRepository from "../../repositories/IMeasureRepository"
import { Result } from "../../util/ResultClassHandle"
import { ServerError } from "../../util/ResultErrors"

export default class ConfirmMeasuresService {
    constructor(
        private repository: IMeasureRepository
    ) { }

    async execute(data: any): Promise<Result<boolean>> {
        try {


            throw Error("TODO")
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`Falha ao confirmar medição:${err.message}`, `ConfirmMeasuresService: execute(${data})`))
        }
    }
}