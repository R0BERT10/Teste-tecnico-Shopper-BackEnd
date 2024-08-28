import { Router } from "express";
import MeasureControllers from "../controllers/measureControllers";
import { handleServerErrors } from "./rootMiddlewares";

const measureRouter = Router();
measureRouter.use(handleServerErrors)

const measureControllers = MeasureControllers()
measureRouter.get("/:customerCode/list", measureControllers.Get.handle)
measureRouter.post("/upload", measureControllers.Post.handle);
measureRouter.patch("/confirm", measureControllers.Patch.handle);


export default measureRouter
