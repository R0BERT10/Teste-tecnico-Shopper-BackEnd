import ConfirmMeasuresService from './ConfirmMeasuresService'
import InMemoryMeasureRepository from '../../repositories/implementations/InMemoryMeasureRepository'
import IMeasureRepository from '../../repositories/IMeasureRepository'
import Measure from '../../entities/Measure'
import { inicialDataMeasureRepository } from '../../util/utilitiesForTest'

describe('ConfirmMeasuresService', () => {
    let repository: IMeasureRepository
    let service: ConfirmMeasuresService
    let initialDataOnRepository: Measure[]
    beforeEach(async () => {
        jest.clearAllMocks()
        repository = new InMemoryMeasureRepository()
        initialDataOnRepository = await inicialDataMeasureRepository(repository)
        service = new ConfirmMeasuresService(repository)
    })


    it("should return result with true value", async () => {
        const data: { measure_uuid: string, confirmed_value: number } = {
            measure_uuid: initialDataOnRepository[0].id,
            confirmed_value: 10
        }

        const result = await service.execute(data)

        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toBe(true)
    })

    it("should return MEASURE_NOT_FOUND error if Measure Uuid was not found", async () => {
        const data: { measure_uuid: string, confirmed_value: any } = {
            measure_uuid: "any value", // Incorrect uuid
            confirmed_value: 10
        }

        const result = await service.execute(data)

        expect(result.isFailure).toBe(true)
        expect(result.getError().codeErrorResponse).toBe("MEASURE_NOT_FOUND")
    })
})