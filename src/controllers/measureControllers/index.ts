import MeasureServices from "../../services/MeasureServices"
import ConfirmMeasureController from "./confirmMeasureController"
import ListMeasureController from "./listMeasureController"
import UploadMeasureController from "./uploadMeasureController"

const measureServices = MeasureServices()

export default function MeasureControllers() {
    return {
        Post: new UploadMeasureController(measureServices.upload),
        Get: new ListMeasureController(measureServices.list),
        Patch: new ConfirmMeasureController(measureServices.confirm)
    }
}