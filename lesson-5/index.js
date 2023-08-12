import express from 'express';
import crypto from 'crypto';
import { generateToken } from './utils/index.js';
import middlewares from './middlewares/index.js';
const app = express();

app.use(express.json());

export const listUser = [
    {
        id: crypto.randomUUID(),
        userName: 'Khoa đẹp trại',
        age: 10,
        email: 'khoa@mail.com',
        location: 'Hà Nội',
        password: '123'
    },
];


app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) throw new Error('Thiếu email!');
        if (!password) throw new Error('Thiếu password!');

        const existedUser = listUser.find((item) => {
            return item.email === email && item.password === password;
        });
        if (!existedUser) throw new Error('Sai tài khoản hoặc mật khẩu!');
        res.status(200).send({
            data: generateToken({ userId: existedUser.id }),
            success: true,
            message: 'Đăng nhập thành công!'
        });
    } catch (error) {
        res.status(403).send({
            data: null,
            success: false,
            message: error.message
        });
    }
});

app.get('/api/user-info', middlewares.verifyToken, middlewares.validateUser, (req, res) => {
    try {
        res.status(200).send({
            // data: ,
            success: true,
            message: 'Tìm thấy!'
        });
    } catch (error) {
        res.status(500).send({
            data: null,
            success: false,
            message: error.message
        });
    }
});
app.get('/api/user-info/:id', (req, res) => {
    try {
        const { id } = req.params;
        const foundUser = listUser.find((item) => item.id === id);
        if (!foundUser) throw new Error('Không tìm thấy người dùng!');
        res.status(200).send({
            data: foundUser,
            success: true,
            message: 'Tìm thấy!'
        });
    } catch (error) {
        res.status(500).send({
            data: null,
            success: false,
            message: error.message
        });
    }
});
app.listen(5001, () => {
    console.log(`Server's running!`);
});