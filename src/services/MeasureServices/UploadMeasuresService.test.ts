import { MeasureTypes } from "../../@types/EnumMeasureTypes"
import Measure from "../../entities/Measure"
import IMeasureRepository from "../../repositories/IMeasureRepository"
import InMemoryMeasureRepository from "../../repositories/implementations/InMemoryMeasureRepository"
import Result from "../../util/ResultClassHandle"
import { image64Example, inicialDataMeasureRepository } from "../../util/utilitiesForTest"
import UploadMeasuresService from "./UploadMeasuresService"

describe('UploadMeasuresService', () => {
    let repository: IMeasureRepository
    let service: UploadMeasuresService
    let initialDataOnRepository: Measure[]

    const imageProcess = {
        uploadImage: jest.fn(),
        describeImage: jest.fn()
    }
    beforeEach(async () => {
        jest.clearAllMocks()
        repository = new InMemoryMeasureRepository()
        initialDataOnRepository = await inicialDataMeasureRepository(repository)
        service = new UploadMeasuresService(repository, imageProcess)
    })
    type Data = {
        image: string,
        customer_code: string,
        measure_datetime: Date,
        measure_type: MeasureTypes
    }

    it("should return the value of the new measurement recorded in the database", async () => {
        const data: Data = {
            image: image64Example,
            customer_code: "5911",
            measure_datetime: new Date(),
            measure_type: MeasureTypes.WATER
        }
        imageProcess.uploadImage.mockResolvedValueOnce(Result.ok("www.google.com"))
        imageProcess.describeImage.mockResolvedValueOnce(Result.ok("100"))
        const result = await service.execute(data)

        expect(imageProcess.uploadImage).toHaveBeenCalledWith(data.image)
        expect(imageProcess.uploadImage).toHaveBeenCalledTimes(1)
        expect(imageProcess.describeImage).toHaveBeenCalledTimes(1)
        expect(result.isSuccess).toBe(true)
        //expect(result.getValue()).toBe({})
    })
})