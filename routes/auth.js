/**
 * @swagger
 * /register:
 *   post:
 *     summary: 사용자 등록
 *     description: 닉네임, 이메일 및 비밀번호를 사용하여 새로운 사용자를 등록합니다.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 새로운 사용자가 성공적으로 등록되었습니다.
 *       400:
 *         description: 요청이 잘못되었습니다. 필수 필드가 누락되었거나 형식이 잘못되었습니다.
 *       500:
 *         description: 서버 오류가 발생했습니다. 사용자 등록에 실패했습니다.
 */



const express = require('express');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const router = express.Router();

const secretKey = process.env.JWT_SECRET_KEY;

router.post("/register", async (req, res) => {
    const { nickname, password, email, password_confirm } = req.body;
    try {
        if (password !== password_confirm) {
            return res.status(500).json({ err: "비밀번호가 서로 틀립니다" });
        }
        const newUser = await authService.registerUser(nickname, email, password);
        res.status(201).json({ result: "success" });
    } catch (err) {
        res.status(500).json({ err: "회원가입이 정상적으로 처리되지 않았습니다." });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.validateUser(email, password);
        if (user) {
            const token = jwt.sign({ userId: email }, secretKey, { expiresIn: '1h' });
            res.cookie('token', token, { httpOnly: true });
            return res.status(200).json({ message: "Login 성공!" });
        } else {
            return res.status(400).json({ error: "유저정보가 올바르지 않습니다." });
        }
    } catch (error) {
        res.status(500).json({ error: "로그인 실패" });
    }
});



module.exports = router;