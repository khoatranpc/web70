import SmartPhoneModel from "../models/smartPhone.js";
import SmartPhone from "../models/smartPhone.js";
import { resClientData } from "../utils/index.js";

const smartPhoneController = {
    // create: async (req, res) => {
    //     try {
    //         const data = req.body;
    //         const smartPhone = new SmartPhone(data);
    //         const createSmartPhone = await smartPhone.create();

    //         resClientData(res, 201, createSmartPhone, 'Thêm thông tin thành công!');
    //     } catch (error) {
    //         resClientData(res, 403, null, error.message);
    //     }
    // },
    getAll: async (req, res) => {
        try {
            const listSmartPhone = await SmartPhoneModel().readAll();
            resClientData(res, 200, listSmartPhone);
        } catch (error) {
            resClientData(res, 500, null, error.message);
        }
    }
};
export default smartPhoneController;