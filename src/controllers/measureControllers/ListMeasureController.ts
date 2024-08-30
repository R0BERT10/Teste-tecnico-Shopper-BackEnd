import { Request, Response } from "express";
import { TypesOfParamsReq } from "../../@types/TypesOfParamsRequest";
import ListMeasuresService from "../../services/MeasureServices/ListMeasuresService";
import { errorBodyResponse } from "../../util/ErrorBodyResponse";
import { MeasureTypes } from "../../@types/EnumMeasureTypes";
import Measure from "../../entities/Measure";
import Result from "../../util/ResultClassHandle";
import ClientError from "../../util/ResultClientErrors";

type InputData = {
    customerCode: string,
    measure_type?: MeasureTypes
}

export default class ListMeasureController {
    constructor(
        private service: ListMeasuresService
    ) { }

    handle = async (req: Request, res: Response) => {
        const params: TypesOfParamsReq = {
            routeParams: req.params,
            queryParams: req.query
        }
        const handle = await this.execute(params)
        if (handle.isFailure) {
            const resultError = handle.getError()
            const bodyError = errorBodyResponse(resultError)
            return res.status(resultError.httpCodeResponse).json(bodyError)
        }
        const result = handle.getValue()
        const measures = result.measures.map(
            ({ id, measure_datetime, measure_type, has_confirmed, image_url }) => {
                return {
                    measure_uuid: id,
                    measure_datetime,
                    measure_type,
                    has_confirmed,
                    image_url
                }
            }
        )
        const body = {
            customer_code: result.customer_code,
            measures
        }
        return res.status(200).json(body);
    }

    private async execute(params: TypesOfParamsReq): Promise<Result<{ measures: Measure[], customer_code: string }>> {
        const inputData = this.inputHandling(params)
        if (inputData.isFailure) {
            return Result.fail(inputData.getError())
        }
        const result = await this.service.execute(inputData.getValue())
        if (result.isFailure) {
            return Result.fail(result.getError())
        }

        return Result.ok({
            measures: result.getValue(),
            customer_code: inputData.getValue().customerCode
        })
    }

    private inputHandling(params: TypesOfParamsReq): Result<InputData> {
        const { routeParams, queryParams } = params
        const { customerCode } = routeParams
        const measure_type = queryParams.measure_type

        if (!(!measure_type || Object.values(MeasureTypes).includes(measure_type.toUpperCase()))) {
            return Result.fail(
                ClientError.INVALID_TYPE(`ListMeasureController: inputHandling(${params})`)
            )
        }

        return Result.ok({
            customerCode,
            measure_type
        })
    }
}