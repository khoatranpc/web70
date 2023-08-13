import { Router } from "express";
import smartPhoneController from "../controllers/smartPhone.js";

const SmartPhoneRouter = Router();
// SmartPhoneRouter.post('', smartPhoneController.create);
SmartPhoneRouter.get('', smartPhoneController.getAll);

export default SmartPhoneRouter;