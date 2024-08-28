import { FindManyOptions } from "typeorm";
import { FindOptionsWhere } from "../../@types/FindOptionsWhere";
import { AppDataSource } from "../../database/data-source";
import Measure, { EssencialMeasure } from "../../entities/Measure";
import IMeasureRepository from "../IMeasureRepository";
import { getDateMonthByDate } from "../../util/getDateMonth";
import Result from "../../util/ResultClassHandle";
import { ClientError } from "../../util/ResultClientErrors";
import { ServerError } from "../../util/ResultServerErrors";

export default class MeasureRepositoryPostgres implements IMeasureRepository {
    private repository = AppDataSource.getRepository(Measure)

    async create(measure: EssencialMeasure): Promise<Result<Measure>> {
        const { startDateMonth, endDateMonth } = getDateMonthByDate(measure.measure_datetime);

        const existsMensureMonth = await this.repository.createQueryBuilder('measure')
            .where('measure.tipo = :tipo', { tipo: 'WATER' })
            .andWhere('measure.data >= :start', { startDateMonth })
            .andWhere('measure.data < :end', { endDateMonth })
            .getCount() > 0;

        if (existsMensureMonth) {
            return Result.fail(ClientError.DOUBLE_REPORT(`MeasureRepositoryPostgres: create(${measure}`))
        }
        const newMeasure = this.repository.create(measure)
        const result = await this.repository.save(newMeasure)
        return Result.ok(result)
    }
    async read(measureQuery?: FindOptionsWhere<Measure>): Promise<Result<Measure[]>> {
        const option = measureQuery as FindManyOptions | undefined
        const measures = await this.repository.find(option)
        if (measures.length == 0) {
            return Result.fail(ClientError.MEASURES_NOT_FOUND(`MeasureRepositoryPostgres: read(${measureQuery})`))
        }
        return Result.ok(measures)
    }
    async update(id: string, update: FindOptionsWhere<Measure>): Promise<Result<Measure>> {
        const measure = await this.repository.findOneBy({ id })
        if (!measure) {
            return Result.fail(ClientError.MEASURE_NOT_FOUND(`MeasureRepositoryPostgres: update(${id}, ${update})`))
        }
        if (update.id) {
            return Result.fail(ServerError.generic("O id não nao pode ser alterado", `MeasureRepositoryPostgres: update(${id}, ${update})`))
        }
        measure.customer_code = update.customer_code ?? measure.customer_code
        measure.has_confirmed = update.has_confirmed ?? measure.has_confirmed
        measure.image_url = update.image_url ?? measure.image_url
        measure.measure_datetime = update.measure_datetime ?? measure.measure_datetime
        measure.measure_type = update.measure_type ?? measure.measure_type
        measure.measure_value = update.measure_value ?? measure.measure_value

        const updatedMeasure = await this.repository.save(measure)
        return Result.ok(updatedMeasure)
    }
    async delete(id: string): Promise<Result<boolean>> {
        if (!(await this.repository.findOneBy({ id }))) {
            return Result.fail(ClientError.MEASURE_NOT_FOUND((`MeasureRepositoryPostgres: delete(${id})`)))
        }
        const result = await this.repository.delete({ id })
        const boolResult = result.affected == null || (result.affected !== undefined && result.affected > 0)
        return Result.ok(boolResult)
    }
}