import { Collections, dbCollection } from "../database/index.js";
import mongodb, { ObjectId } from 'mongodb';
class SmartPhone {
    // thuộc tính
    phoneName;
    ver;
    type;
    PIN;
    date;
    _id = new ObjectId();
    // hàm tạo
    constructor(data) {
        if (data) {
            this.phoneName = data.phoneName;
            this.ver = data.ver;
            this.type = data.type;
            this.PIN = data.PIN;
            this.date = data.date;
        }
    }
    // phương thức
    async create() {
        const dataCreate = {
            phoneName: this.phoneName,
            ver: this.ver,
            type: this.type,
            PIN: this.PIN,
            date: this.date,
            _id: this._id
        }
        const insertDb = await dbCollection[Collections['SMARTPHONE']].insertOne(dataCreate);
        return insertDb;
    }
    async readAll() {
        const listData = await dbCollection[Collections['SMARTPHONE']].find({}).toArray();
        return listData;
    }
}
const SmartPhoneModel = (data) => {
    return new SmartPhone(data);
};
export default SmartPhoneModel;