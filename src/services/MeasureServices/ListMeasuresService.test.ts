import { MeasureTypes } from "../../@types/EnumMeasureTypes"
import Measure from "../../entities/Measure"
import IMeasureRepository from "../../repositories/IMeasureRepository"
import InMemoryMeasureRepository from "../../repositories/implementations/InMemoryMeasureRepository"
import { inicialDataMeasureRepository } from "../../util/utilitiesForTest"
import ListMeasuresService from "./ListMeasuresService"


describe('ListMeasuresService', () => {
    let repository: IMeasureRepository
    let service: ListMeasuresService
    let initialDataOnRepository: Measure[]
    beforeEach(async () =>  {
        jest.clearAllMocks()
        repository = new InMemoryMeasureRepository()
        initialDataOnRepository = await inicialDataMeasureRepository(repository)
        service = new ListMeasuresService(repository)
    })

    it("should return result with true value", async () =>  {
        const data: { customerCode: string, measure_type?: MeasureTypes } = {
            customerCode: "",
            measure_type: undefined
        }
        
        const result = await service.execute(data)

        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toStrictEqual(initialDataOnRepository)
    })
    
    it("must return result with true value filtered by measure_type", async () =>  {
        const data: { customerCode: string, measure_type?: MeasureTypes } = {
            customerCode: "",
            measure_type: MeasureTypes.GAS
        }
        
        const result = await service.execute(data)

        expect(result.isSuccess).toBe(true)
        expect(result.getValue()).toStrictEqual(
            initialDataOnRepository.filter(measure => measure.measure_type === MeasureTypes.GAS)
        )
    })

    it("should return MEASURES_NOT_FOUND error if not found", async () =>  {
        const data: { customerCode: string, measure_type?: MeasureTypes } = {
            customerCode: "any value",
            measure_type: MeasureTypes.GAS
        }

        const result = await service.execute(data)

        expect(result.isFailure).toBe(true)
        expect(result.getError().codeErrorResponse).toBe("MEASURES_NOT_FOUND")
    })
})