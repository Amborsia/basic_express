const express = require('express');


const authService = require('../services/authService');
const router = express.Router();

router.post("/register", async (req, res) => {
    const { nickname, password, email } = req.body;
    try {
        const newUser = await authService.registerUser(nickname, email, password);
        res.status(201).json({ result: "success" });
    } catch (err) {
        res.status(500).json({ err: "회원가입이 정상적으로 처리되지 않았습니다." });
    }
})

module.exports = router;