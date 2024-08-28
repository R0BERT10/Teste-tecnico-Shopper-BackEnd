import { Request, Response } from "express";
import { Result } from "../../util/ResultClassHandle";
import { TypesOfParamsReq } from "../../@types/TypesOfParamsRequest";
import ConfirmMeasuresService from "../../services/MeasureServices/confirmMeasuresService";

type InputData = {
}

export default class ConfirmMeasureController {
    constructor(
        private service: ConfirmMeasuresService
    ) { }

    handle = async (req: Request, res: Response) => {
        throw Error("TODO")
    }

    private async execute(params: TypesOfParamsReq): Promise<Result<any>> {
        throw Error("TODO")
    }

    private inputHandling(params: TypesOfParamsReq): Result<InputData> {
        throw Error("TODO")
    }
}