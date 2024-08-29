import IMeasureRepository from "../../repositories/IMeasureRepository"
import Result from "../../util/ResultClassHandle"
import ServerError from "../../util/ResultServerErrors"

type Data = {
    measure_uuid: string,
    confirmed_value: number
}

export default class ConfirmMeasuresService {
    constructor(
        private repository: IMeasureRepository
    ) { }

    async execute(data: Data): Promise<Result<boolean>> {
        try {
            const result = await this.repository.update(
                data.measure_uuid,
                {
                    measure_value: data.confirmed_value,
                    has_confirmed: true
                }
            )

            if (result.isFailure) {
                return Result.fail(result.getError())
            }

            return Result.ok(true)

        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`Falha ao confirmar medição:${err.message}`, `ConfirmMeasuresService: execute(${data})`))
        }
    }
}