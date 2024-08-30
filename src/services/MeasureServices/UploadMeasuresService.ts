import { MeasureTypes } from "../../@types/EnumMeasureTypes"
import Measure from "../../entities/Measure"
import IImageProcessingProvider from "../../providers/IImageProcessingProvider"
import IMeasureRepository from "../../repositories/IMeasureRepository"
import Result from "../../util/ResultClassHandle"
import ServerError from "../../util/ResultServerErrors"

type Data = {
    image: string,
    customer_code: string,
    measure_datetime: Date,
    measure_type: MeasureTypes
}

export default class UploadMeasuresService {
    constructor(
        private repository: IMeasureRepository,
        private imageProcess: IImageProcessingProvider
    ) { }

    async execute(data: Data): Promise<Result<Measure>> {
        try {
            const resultUrl = await this.imageProcess.uploadImage(data.image)
            if (resultUrl.isFailure) {
                return Result.fail(resultUrl.getError())
            }
            const resultDescriberImage = await this.imageProcess.describeImage()
            if (resultDescriberImage.isFailure) {
                return Result.fail(resultDescriberImage.getError())
            }
            const measureValue = this.convertDescriberToValidNumber(resultDescriberImage.getValue())
            if (measureValue instanceof ServerError) {
                return Result.fail(measureValue)
            }

            const measure = new Measure()
            measure.measure_value = measureValue
            measure.customer_code = data.customer_code
            measure.measure_datetime = data.measure_datetime
            measure.measure_type = data.measure_type
            measure.image_url = resultUrl.getValue()
            return await this.repository.create(measure)
        } catch (error) {
            const err = error as Error
            return Result.fail(ServerError.generic(`Falha ao registrar medição:${err.message}`, `UploadMeasuresService: execute(${data})`))
        }
    }

    convertDescriberToValidNumber(describer: string): number | ServerError {
        const value = +describer.replace(/\n/g, '')
        if (isNaN(value)) {
            return ServerError.IMAGE_PROCESSING(`UploadMeasuresService: convertDescriberToValidNumber(${describer})`)
        }
        return value
    }
}