import { Request, Response } from "express";
import { TypesOfParamsReq } from "../../@types/TypesOfParamsRequest";
import { MeasureTypes } from "../../@types/EnumMeasureTypes";
import UploadMeasuresService from "../../services/MeasureServices/UploadMeasuresService";
import Measure from "../../entities/Measure";
import { errorBodyResponse } from "../../util/ErrorBodyResponse";
import Result from "../../util/ResultClassHandle";
import { ClientError } from "../../util/ResultClientErrors";

type InputData = {
    image: string,
    customer_code: string,
    measure_datetime: Date,
    measure_type: MeasureTypes
}

export default class UploadMeasureController {
    constructor(
        private service: UploadMeasuresService
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
            image_ulr: result.image_url,
            measure_value: result.measure_value,
            measure_uuid: result.id
        }
        return res.status(200).json(body);
    }

    private async execute(params: TypesOfParamsReq): Promise<Result<Measure>> {
        const inputData = this.inputHandling(params)
        if (inputData.isFailure) {
            return Result.fail(inputData.getError())
        }
        return await this.service.execute(inputData.getValue())
    }

    private inputHandling(params: TypesOfParamsReq): Result<InputData> {
        const { image, customer_code, measure_datetime, measure_type } = params.bodyParams
        const invalidInputMessage = "Os dados fornecidos no corpo da requisição são inválidos"
        if (image) { throw Error("TODO") }
        if (!(customer_code && typeof customer_code == "string")) {
            return Result.fail(
                ClientError.INVALID_DATA(invalidInputMessage + " <customer_code incorrect>.", `UploadController: inputHandling(${params})`)
            )
        }
        if (!(measure_datetime && measure_datetime instanceof Date)) {
            console.log(measure_datetime)
            return Result.fail(
                ClientError.INVALID_DATA(invalidInputMessage + " <measure_datetime incorrect>.", `UploadController: inputHandling(${params})`)
            )
        }
        if (!(measure_type && Object.values(MeasureTypes).includes(measure_type))) {
            return Result.fail(
                ClientError.INVALID_DATA(invalidInputMessage + " <measure_type incorrect>.", `UploadController: inputHandling(${params})`)
            )
        }

        return Result.ok({
            image,
            customer_code,
            measure_datetime,
            measure_type
        })
    }
}