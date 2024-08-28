import { FindOptionsWhere } from "../@types/FindOptionsWhere"
import Measure, { EssencialMeasure } from "../entities/Measure"
import Result from "../util/ResultClassHandle"

export default interface IMeasureRepository {
    create(newMeasure: EssencialMeasure): Promise<Result<Measure>>

    read(measureQuery?: FindOptionsWhere<Measure>): Promise<Result<Measure[]>>

    update(id: string, update: FindOptionsWhere<Measure>): Promise<Result<Measure>>

    delete(id: string): Promise<Result<boolean>>
}
