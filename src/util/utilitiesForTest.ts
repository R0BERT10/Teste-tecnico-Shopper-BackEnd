import { MeasureTypes } from "../@types/EnumMeasureTypes"
import Measure from "../entities/Measure"
import IMeasureRepository from "../repositories/IMeasureRepository"

export const factoryMeasure = (
    measure_id: string,
    measure_type: MeasureTypes = MeasureTypes.GAS,
    has_confirmed: boolean = false,
    image_url: string = "url"
) => {
    const measure = new Measure()
    measure.id = measure_id
    measure.measure_type = measure_type
    measure.has_confirmed = has_confirmed
    measure.image_url = image_url
    return measure
}

export const exampleListMeasure = [
    factoryMeasure("12345678-1234-1234-1234-123456789016", MeasureTypes.GAS, false, "instagram.com"),
    factoryMeasure("12345678-1234-1234-1234-123456789012", MeasureTypes.GAS, true, "url"),
    factoryMeasure("12345678-1234-1234-1234-123456789013", MeasureTypes.WATER, false, "google.com"),
    factoryMeasure("12345678-1234-1234-1234-123456789014", MeasureTypes.GAS, false, "facebook.com"),
    factoryMeasure("12345678-1234-1234-1234-123456789015", MeasureTypes.WATER, true, "youtube.com"),
]

export const inicialDataMeasureRepository = async (repository: IMeasureRepository) => {
    exampleListMeasure.forEach(measure => {
        repository.create(measure)
    })
    return (await repository.read()).getValue()
}

export const exampleListOneMeasure = [exampleListMeasure[0]]

export const image64Example = "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"