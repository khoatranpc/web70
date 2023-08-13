import { Router } from 'express';
import SmartPhoneRouter from './smartPhone.js';

const RootRouterV1 = Router();
// /api/v1/smart-phone/.....
RootRouterV1.use('/smart-phone', SmartPhoneRouter);
export default RootRouterV1;