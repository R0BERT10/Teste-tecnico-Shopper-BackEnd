import { FindOptionsWhere } from "../@types/FindOptionsWhere"
import Measure from "../entities/Measure"
import { Result } from "../util/ResultClassHandle"

export default interface IMeasureRepository {
    create(newMeasure: Measure): Promise<Result<Measure>>

    read(measureQuery?: FindOptionsWhere<Measure>): Promise<Result<Measure[]>>

    update(id: number, update: FindOptionsWhere<Measure>): Promise<Result<Measure>>

    delete(id: number): Promise<Result<boolean>>
}
