import ConfirmMeasureController from "./ConfirmMeasureController"
import Result from "../../util/ResultClassHandle";
import ClientError from "../../util/ResultClientErrors";

describe("ConfirmMeasureController", () => {
    const confirmMeasuresService = { execute: jest.fn() }
    let confirmMeasureController: ConfirmMeasureController
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    beforeEach(() => {
        jest.clearAllMocks()
        confirmMeasureController = new ConfirmMeasureController(confirmMeasuresService as any)
    });

    describe("should return invalid request body data error", () => {

        it("should return measure_uuid incorrect", async () => {
            const req = {
                body: {
                    measure_uuid: 10, // Incorrect string require
                    confirmed_value: 10
                }
            };
            await confirmMeasureController.handle(req as any, res as any)

            expect(confirmMeasuresService.execute).toHaveBeenCalledTimes(0)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos <measure_uuid incorrect>."
            })

        })

        it("should return confirmed_value incorrect", async () => {
            const req = {
                body: {
                    measure_uuid: "12345678-1234-1234-1234-123456789012",
                    confirmed_value: "10" // Incorrect number require
                }
            };
            await confirmMeasureController.handle(req as any, res as any)

            expect(confirmMeasuresService.execute).toHaveBeenCalledTimes(0)
            expect(res.status).toHaveBeenCalledWith(400)
            expect(res.json).toHaveBeenCalledWith({
                error_code: "INVALID_DATA",
                error_description: "Os dados fornecidos no corpo da requisição são inválidos <confirmed_value incorrect>."
            })
        })

    })

    const req = {
        body: {
            measure_uuid: "12345678-1234-1234-1234-123456789012",
            confirmed_value: 10
        }
    };
    it("should return a success response", async () => {
        confirmMeasuresService.execute.mockResolvedValueOnce(Result.ok(true))
        await confirmMeasureController.handle(req as any, res as any)

        expect(confirmMeasuresService.execute).toHaveBeenCalledTimes(1)
        expect(confirmMeasuresService.execute).toHaveBeenCalledWith({
            measure_uuid: "12345678-1234-1234-1234-123456789012",
            confirmed_value: 10
        })
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ success: true })
    })

    it("should return a measurement not found error response", async () => {
        confirmMeasuresService.execute.mockResolvedValueOnce(Result.fail(ClientError.MEASURE_NOT_FOUND("teste")))
        await confirmMeasureController.handle(req as any, res as any)

        expect(confirmMeasuresService.execute).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({
            error_code: "MEASURE_NOT_FOUND",
            error_description: ClientError.enum.MEASURE_NOT_FOUND
        })
    })

    it("should return a measurement error response already confirmed", async () => {
        confirmMeasuresService.execute.mockResolvedValueOnce(Result.fail(ClientError.CONFIRMATION_DUPLICATE("teste")))
        await confirmMeasureController.handle(req as any, res as any)

        expect(confirmMeasuresService.execute).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(409)
        expect(res.json).toHaveBeenCalledWith({
            error_code: "CONFIRMATION_DUPLICATE",
            error_description: ClientError.enum.CONFIRMATION_DUPLICATE
        })
    })
});
