import { Request, Response } from "express";
import { TypesOfParamsReq } from "../../@types/TypesOfParamsRequest";
import ConfirmMeasuresService from "../../services/MeasureServices/ConfirmMeasuresService";
import { errorBodyResponse } from "../../util/ErrorBodyResponse";
import Result from "../../util/ResultClassHandle";
import ClientError from "../../util/ResultClientErrors";

type InputData = {
    measure_uuid: string,
    confirmed_value: number
}

export default class ConfirmMeasureController {
    constructor(
        private service: ConfirmMeasuresService
    ) { }

    handle = async (req: Request, res: Response) => {
        const params: TypesOfParamsReq = {
            bodyParams: req.body
        }
        const handle = await this.execute(params)
        if (handle.isFailure) {
            const resultError = handle.getError()
            const bodyError = errorBodyResponse(resultError)
            return res.status(resultError.httpCodeResponse).json(bodyError)
        }
        const result = handle.getValue()
        const body = {
            success: result
        }
        return res.status(200).json(body);
    }

    private async execute(params: TypesOfParamsReq): Promise<Result<boolean>> {
        const inputData = this.inputHandling(params)
        if (inputData.isFailure) {
            return Result.fail(inputData.getError())
        }
        return await this.service.execute(inputData.getValue())
    }

    private inputHandling(params: TypesOfParamsReq): Result<InputData> {
        const { measure_uuid, confirmed_value } = params.bodyParams

        const invalidInputMessage = "Os dados fornecidos no corpo da requisição são inválidos"
        if (!(measure_uuid && typeof measure_uuid == "string")) {
            return Result.fail(
                ClientError.INVALID_DATA(invalidInputMessage + " <measure_uuid incorrect>.", `ConfirmMeasureController: inputHandling(${params})`)
            )
        }
        if (!(confirmed_value && typeof confirmed_value == "number")) {
            return Result.fail(
                ClientError.INVALID_DATA(invalidInputMessage + " <confirmed_value incorrect>.", `ConfirmMeasureController: inputHandling(${params})`)
            )
        }

        return Result.ok({
            measure_uuid,
            confirmed_value
        })
    }
}