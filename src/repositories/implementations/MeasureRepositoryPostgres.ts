import { FindOptionsWhere } from "../../@types/FindOptionsWhere";
import Measure from "../../entities/Measure";
import { Result } from "../../util/ResultClassHandle";
import IMeasureRepository from "../IMeasureRepository";

export default class MeasureRepositoryPostgres implements IMeasureRepository {
    create(newMeasure: Measure): Promise<Result<Measure>> {
        throw new Error("Method not implemented.");
    }
    read(measureQuery?: FindOptionsWhere<Measure>): Promise<Result<Measure[]>> {
        throw new Error("Method not implemented.");
    }
    update(id: number, update: FindOptionsWhere<Measure>): Promise<Result<Measure>> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Promise<Result<boolean>> {
        throw new Error("Method not implemented.");
    }
}