import UploadMeasureController from "../controllers/measureControllers/UploadMeasureController";
import Result from "../util/ResultClassHandle";
import ClientError from "../util/ResultClientErrors";
import { factoryMeasure } from "./ListMeasureController.test";

describe("UploadMeasureController", () => {
    const uploadMeasureService = { execute: jest.fn() }
    let uploadMeasureController: UploadMeasureController
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    beforeEach(() => {
        jest.clearAllMocks()
        uploadMeasureController = new UploadMeasureController(uploadMeasureService as any)
    });

    describe("should return invalid request body data error", () => {

        it("should return image incorrect", async () => {
            const req = {
                body: { 
                    image: undefined,
                    customer_code : "10", 
                    measure_datetime: new Date(),
                    measure_type: "GAS"
                }
            };
            await uploadMeasureController.handle(req as any, res as any)

            expect(uploadMeasureService.execute).toHaveBeenCalledTimes(0)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos <customer_code incorrect>."
            })

        })

        it("should return customer_code incorrect", async () => {
            const req = {
                body: { 
                    image: "",
                    customer_code : 10, // Incorrect string require
                    measure_datetime: new Date(),
                    measure_type: "GAS"
                }
            };
            await uploadMeasureController.handle(req as any, res as any)

            expect(uploadMeasureService.execute).toHaveBeenCalledTimes(0)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos <customer_code incorrect>."
            })

        })

        it("should return measure_datetime incorrect", async () => {
            const req = {
                body: { 
                    image: "",
                    customer_code : "10", 
                    measure_datetime: "Date()", // Incorrect string require
                    measure_type: "GAS"
                }
            };
            await uploadMeasureController.handle(req as any, res as any)

            expect(uploadMeasureService.execute).toHaveBeenCalledTimes(0)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos <measure_datetime incorrect>."
            })

        })

        it("should return measure_type incorrect", async () => {
            const req = {
                body: { 
                    image: "",
                    customer_code : "10", 
                    measure_datetime: new Date(),
                    measure_type: "teste" // Incorrect
                }
            };
            await uploadMeasureController.handle(req as any, res as any)

            expect(uploadMeasureService.execute).toHaveBeenCalledTimes(0)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos <measure_type incorrect>."
            })
        })
    })


    const req = {
        body: { 
            image: "",
            customer_code : "10", 
            measure_datetime: new Date(),
            measure_type: "GAS"
        }
    };
    it("should return a success response", async () => {
        uploadMeasureService.execute.mockResolvedValueOnce(Result.ok(factoryMeasure("12345678-1234")))
        await uploadMeasureController.handle(req as any, res as any)

        expect(uploadMeasureService.execute).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            image_ulr: "url",
            measure_value: undefined,
            measure_uuid: "12345678-1234"
        })
    })

    it("must return a mediation error response of this type already registered this month", async () => {
        uploadMeasureService.execute.mockResolvedValueOnce(Result.fail(ClientError.DOUBLE_REPORT("teste")))
        await uploadMeasureController.handle(req as any, res as any)

        expect(uploadMeasureService.execute).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.json).toHaveBeenCalledWith({
            error_code: "DOUBLE_REPORT",
            error_description: ClientError.enum.DOUBLE_REPORT
        })
    })
})