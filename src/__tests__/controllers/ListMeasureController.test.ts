import { MeasureTypes } from "../@types/EnumMeasureTypes";
import ListMeasureController from "../controllers/measureControllers/ListMeasureController";
import Measure from "../entities/Measure";
import Result from "../util/ResultClassHandle";
import ClientError from "../util/ResultClientErrors";


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

const listMeasure = [
    //factoryMeasure("12345678-1234-1234-1234-123456789012", MeasureTypes.GAS, true, "url"),
    //factoryMeasure("12345678-1234-1234-1234-123456789013", MeasureTypes.WATER, false, "google.com"),
    //factoryMeasure("12345678-1234-1234-1234-123456789014", MeasureTypes.GAS, false, "facebook.com"),
    //factoryMeasure("12345678-1234-1234-1234-123456789015", MeasureTypes.WATER, true, "youtube.com"),
    factoryMeasure("12345678-1234-1234-1234-123456789016", MeasureTypes.GAS, false, "instagram.com"),
]



describe("listMeasureController", () => {
    const listMeasuresService = { execute: jest.fn() }
    let listMeasureController: ListMeasureController
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    beforeEach(() => {
        jest.clearAllMocks()
        listMeasureController = new ListMeasureController(listMeasuresService as any)
    });

    const req = {
        params: { customerCode: "123456789012" },
        query: { measure_type: undefined }
    };

    it("should return a success response", async () => {
        listMeasuresService.execute.mockResolvedValueOnce(Result.ok(listMeasure))
        await listMeasureController.handle(req as any, res as any)

        expect(listMeasuresService.execute).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            customer_code: "123456789012",
            measures: [
                {
                    has_confirmed: false,
                    image_url: "instagram.com",
                    measure_datetime: undefined,
                    measure_type: 1,
                    measure_uuid: "12345678-1234-1234-1234-123456789016",
                }
            ]
        })
    })

    it("should return a success response with the query measure type", async () => {
        const req = {
            params: { customerCode: "123456789012" },
            query: { measure_type: "GAS" }
        };
        listMeasuresService.execute.mockResolvedValueOnce(Result.ok(listMeasure))
        await listMeasureController.handle(req as any, res as any)

        expect(listMeasuresService.execute).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            customer_code: "123456789012",
            measures: [
                {
                    has_confirmed: false,
                    image_url: "instagram.com",
                    measure_datetime: undefined,
                    measure_type: 1,
                    measure_uuid: "12345678-1234-1234-1234-123456789016",
                }
            ]
        })
    })

    it("should return error of measurements not found", async () => {
        listMeasuresService.execute.mockResolvedValueOnce(Result.fail(ClientError.MEASURES_NOT_FOUND("teste")))
        await listMeasureController.handle(req as any, res as any)

        expect(listMeasuresService.execute).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            error_code: "MEASURES_NOT_FOUND",
            error_description: ClientError.enum.MEASURES_NOT_FOUND
        })
    })

    it("should return incorrect measure type error", async () => {
        const req = {
            params: { customerCode: "123456789012" },
            query: { measure_type: "teste" } // Type incorrect
        };
        await listMeasureController.handle(req as any, res as any)

        expect(listMeasuresService.execute).toHaveBeenCalledTimes(0)
        expect(res.status).toHaveBeenCalledWith(400)
        expect(res.json).toHaveBeenCalledWith({
            error_code: "INVALID_TYPE",
            error_description: ClientError.enum.INVALID_TYPE
        })
    })
});