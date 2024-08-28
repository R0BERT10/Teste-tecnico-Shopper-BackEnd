import { Request, Response } from "express";
import { Result } from "../../util/ResultClassHandle";
import { TypesOfParamsReq } from "../../@types/TypesOfParamsRequest";
import ListMeasuresService from "../../services/MeasureServices/listMeasuresService";

type InputData = {
}

export default class ListMeasureController {
    constructor(
        private service: ListMeasuresService
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