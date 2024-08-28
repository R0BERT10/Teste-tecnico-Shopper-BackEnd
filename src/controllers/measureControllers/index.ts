import MeasureServices from "../../services/MeasureServices"
import ConfirmMeasureController from "./ConfirmMeasureController"
import ListMeasureController from "./ListMeasureController"
import UploadMeasureController from "./UploadMeasureController"

const measureServices = MeasureServices()

export default function MeasureControllers() {
    return {
        Post: new UploadMeasureController(measureServices.upload),
        Get: new ListMeasureController(measureServices.list),
        Patch: new ConfirmMeasureController(measureServices.confirm)
    }
}