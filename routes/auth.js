/**
 * @swagger
 * /api/register:
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
 *                 description: 사용자 닉네임
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 사용자 이메일
 *                 example: "example@example.com"
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: 새로운 사용자가 성공적으로 등록되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 결과 메시지
 *                   example: "success"
 *       400:
 *         description: 요청이 잘못되었습니다. 필수 필드가 누락되었거나 형식이 잘못되었습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "필수 필드가 누락되었습니다."
 *       500:
 *         description: 서버 오류가 발생했습니다. 사용자 등록에 실패했습니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 err:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "회원가입이 정상적으로 처리되지 않았습니다."
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: 유저 로그인
 *     description: 이메일과 비밀번호로 유저 로그인을 수행합니다.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: 유저 이메일
 *                 example: example@example.com
 *               password:
 *                 type: string
 *                 description: 유저 비밀번호
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: 성공적으로 로그인됨
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 로그인 결과 메시지
 *                   example: "Login 성공!"
 *       400:
 *         description: 올바르지 않은 유저 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "유저정보가 올바르지 않습니다."
 *       500:
 *         description: 서버 에러
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 에러 메시지
 *                   example: "로그인 실패"
 */



const express = require('express');
const jwt = require('jsonwebtoken');
const authService = require('../services/authService');
const router = express.Router();

const secretKey = 'sjdafkjawelrlknlkwenlrklkwflkd';

router.post("/register", async (req, res) => {
    const { nickname, password, email } = req.body;
    try {
        console.log('레지스터 시작');
        // if (password !== password_confirm) {
        //     console.log('비밀번호 다른지 확인해서 다르게뜸');
        //     return res.status(500).json({ err: "비밀번호가 서로 틀립니다" });
        // }
        const newUser = await authService.registerUser(nickname, email, password);
        console.log(newUser);
        res.status(201).json({ result: "success" });
    } catch (err) {
        console.log('에러', err);
        res.status(500).json({ err: "회원가입이 정상적으로 처리되지 않았습니다." });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await authService.validateUser(email, password);
        console.log('로그인 시작', user);
        if (user) {
            const token = jwt.sign({ email: email }, secretKey, { expiresIn: '1h' });
            console.log('토큰 시작', token);
            res.cookie('token', token);
            return res.status(200).json({ result: "Login 성공!" });
        } else {
            console.log('err 400', user);
            return res.status(400).json({ error: "유저정보가 올바르지 않습니다." });
        }
    } catch (error) {
        console.log('err 500', error);
        res.status(500).json({ error: "로그인 실패" });
    }
});



module.exports = router;