import ConfirmMeasureController from "../controllers/measureControllers/ConfirmMeasureController"
import ConfirmMeasuresService from "../services/MeasureServices/ConfirmMeasuresService"
import Result from "../util/ResultClassHandle";

jest.mock('../services/MeasureServices/ConfirmMeasuresService')

describe("ConfirmMeasureController", () => {
    let confirmMeasuresService: jest.Mocked<ConfirmMeasuresService>
    let confirmMeasureController: ConfirmMeasureController
    beforeEach(() => {
        jest.clearAllMocks()
        confirmMeasureController = new ConfirmMeasureController(confirmMeasuresService)
    });

    it("should return a success response", async () => {
        const req = {
            body: {
                measure_uuid: "12345678-1234-1234-1234-123456789012",
                confirmed_value: 10
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        
        
        confirmMeasuresService.execute.mockRejectedValueOnce(Result.ok(true))

        await confirmMeasureController.handle(req as any, res as any)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({ success: true })
    })

    it("should return an error response of invalid request body data", async () => {
        
    })

    it("should return a measurement not found error response", async () => {
        
    })

    it("should return a measurement error response already confirmed", async () => {
        
    })
    /*
    it("should return a success response when the service returns a success", async () => {
        const measure_uuid = "12345678-1234-1234-1234-123456789012";
        const confirmed_value = 10;
        const mockExecute = jest.spyOn(confirmMeasuresService, "execute").mockResolvedValue(Result.ok(true));

        const req = {
            body: {
                measure_uuid,
                confirmed_value
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await confirmMeasureController.handle(req as any, res as any);

        expect(mockExecute).toHaveBeenCalledWith({ measure_uuid, confirmed_value });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });
    */
});
