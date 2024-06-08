const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const Auth = require("../schemas/auth");

module.exports = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ error: '토큰이 없습니다' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const user = await Auth.findOne({ _id: decoded.userId });
        if (!user) {
            return res.status(401).json({ error: '토큰 인증 실패2' });
        }
        req.user = user;
        res.locals.nickname = user.nickname;
        next();
    } catch (err) {
        return res.status(401).json({ error: '토큰 인증 실패' });
    }
};