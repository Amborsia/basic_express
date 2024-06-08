const express = require('express');


const authService = require('../services/authService');
const router = express.Router();

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
})

module.exports = router;