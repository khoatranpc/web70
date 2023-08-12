import { listUser } from "../index.js";
import { verifyToken } from "../utils/index.js";

const middlewares = {
    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = verifyToken(token);
            req.userId = decoded.userId;
            next();
        } catch (error) {
            res.status(403).send({
                data: null,
                success: false,
                message: error.message
            });
        }
    },
    validateUser: (req, res, next) => {
        try {
            //code logic -> kiểm tra người dùng có tồn tại với userId trên req?
            const findUser = listUser.find(item => item.id === req.userId);
            if (!findUser) throw new Error('Không hợp lệ!');
            next();
        } catch (error) {
            res.status(403).send({
                data: null,
                success: false,
                message: error.message
            });
        }
    }
}
export default middlewares;