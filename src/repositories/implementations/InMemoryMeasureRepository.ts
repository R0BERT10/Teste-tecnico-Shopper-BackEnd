import { DestructureEntity } from "../../@types/DestructureEntity";
import Measure, { MeasureDTO } from "../../entities/Measure";
import IMeasureRepository from "../IMeasureRepository";
import Result from "../../util/ResultClassHandle";
import ClientError from "../../util/ResultClientErrors";
import { randomUUID } from "crypto";

export default class InMemoryMeasureRepository implements IMeasureRepository {

    private measures: Measure[] = []

    async create(measure: MeasureDTO): Promise<Result<Measure>> {
        const existsMensureMonth = this.measures.find((value) => {
            return value.customer_code == measure.customer_code &&
                value.measure_type == measure.measure_type &&
                value.measure_datetime.getUTCMonth == measure.measure_datetime.getUTCMonth
        })

        if (existsMensureMonth) {
            return Result.fail(ClientError.DOUBLE_REPORT(`MeasureRepositoryPostgres: create(${measure}`))
        }

        const newMeasure = new Measure()
        newMeasure.id = randomUUID()
        newMeasure.has_confirmed = false
        newMeasure.image_url = measure.image_url || ""
        newMeasure.measure_value = measure.measure_value
        newMeasure.customer_code = measure.customer_code
        newMeasure.measure_datetime = measure.measure_datetime
        newMeasure.measure_type = measure.measure_type
        this.measures.push(newMeasure)
        return Result.ok(newMeasure)
    }
    async read(measureQuery?: DestructureEntity<Measure>): Promise<Result<Measure[]>> {
        const measures = this.measures.filter(measure => {
            if (measureQuery) {
                if (measureQuery.id) {
                    return measure.id == measureQuery.id
                }
                if (measureQuery.customer_code) {
                    return measure.customer_code == measureQuery.customer_code
                }
                if (measureQuery.measure_type) {
                    return measure.measure_type == measureQuery.measure_type
                }
                if (measureQuery.has_confirmed) {
                    return measure.has_confirmed == measureQuery.has_confirmed
                }
            }
            return true
        })
        if (measures.length == 0) {
            return Result.fail(ClientError.MEASURES_NOT_FOUND(`InMemoryMeasureRepository: read(${measureQuery})`))
        }
        return Result.ok(measures)
    }
    async update(id: string, update: DestructureEntity<Measure>): Promise<Result<Measure>> {
        const measure = this.measures.find(measure => measure.id == id)
        if (!measure) {
            return Result.fail(ClientError.MEASURE_NOT_FOUND(`InMemoryMeasureRepository: update(${id})`))
        }
        measure.customer_code = update.customer_code ?? measure.customer_code
        measure.measure_datetime = update.measure_datetime ?? measure.measure_datetime
        measure.measure_type = update.measure_type ?? measure.measure_type
        measure.measure_value = update.measure_value ?? measure.measure_value
        measure.image_url = update.image_url ?? measure.image_url
        measure.has_confirmed = update.has_confirmed ?? measure.has_confirmed

        return Result.ok(measure)
    }

    async delete(id: string): Promise<Result<boolean>> {
        const measure = this.measures.find(measure => measure.id == id)
        if (!measure) {
            return Result.fail(ClientError.MEASURE_NOT_FOUND(`InMemoryMeasureRepository: update(${id})`))
        }
        this.measures.splice(this.measures.indexOf(measure), 1)
        return Result.ok(true)
    }
}