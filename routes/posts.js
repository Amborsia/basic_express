
/**
 * @swagger
 * tags:
 *   name: post
 *   description: 게시글관련 작업이 이쪽입니다~~~~
 */

/**
 * @swagger
 * /board:
 *   get:
 *     summary: 게시글 목록 조회
 *     tags: [post]
 *     description: 게시글 목록을 조회합니다.
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 목록을 조회한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 goods:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: 게시글의 ID
 *                       title:
 *                         type: string
 *                         description: 게시글의 제목
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: 게시글 작성 날짜
 *       400:
 *         description: 게시글 조회 실패한 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 에러 메시지
 */

/**
 * @swagger
 * /board:
 *   post:
 *     summary: 게시글 작성
 *     tags: [post]
 *     description: 새로운 게시글을 작성합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 게시글 제목
 *               id:
 *                 type: string
 *                 description: 작성자 ID
 *               pw:
 *                 type: string
 *                 description: 게시글 비밀번호
 *               content:
 *                 type: string
 *                 description: 게시글 내용
 *     responses:
 *       201:
 *         description: 새로운 게시글이 성공적으로 작성된 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 요청 결과
 *       400:
 *         description: 요청이 잘못된 경우
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 에러 메시지
 */

// 특정 ID의 게시글 조회
/**
 * @swagger
 * /board/{id}:
 *   get:
 *     summary: 특정 게시글 조회
 *     tags: [post]
 *     description: ID로 특정 게시글을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글의 사용자 ID
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 boards:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       date:
 *                         type: string
 *       400:
 *         description: 잘못된 요청
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: fail
 */

/**
 * @swagger
 * /board/{id}:
 *   put:
 *     summary: 게시글 수정 API
 *     description: 비밀번호가 같다면 게시글을 수정합니다.
 *     tags: [post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               pw:
 *                 type: string
 *             example:
 *               title: "수정된 제목"
 *               content: "수정된 내용"
 *               pw: "1234"
 *     responses:
 *       200:
 *         description: 게시글 수정 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "넌 완벽히 해냈어!"
 *       404:
 *         description: 게시글을 찾을 수 없음 또는 비밀번호가 틀림
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "Post Not Found 또는 비밀번호가 틀립니다"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "Server error"
 */

/**
 * @swagger
 * /board/{id}:
 *   delete:
 *     summary: 게시글 삭제 API
 *     description: 비밀번호가 일치하면 게시글을 삭제합니다.
 *     tags: [post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               pw:
 *                 type: string
 *             example:
 *               title: "첫번째야"
 *               pw: "1234"
 *     responses:
 *       200:
 *         description: 게시글 삭제 완료
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "너는 해내고야 말았어"
 *       404:
 *         description: 게시글을 찾을 수 없음 또는 비밀번호가 틀림
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "비밀번호가 틀립니다 또는 Fail"
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "Server error"
 */






const express = require('express');
const router = express.Router();
const Goods = require('../schemas/post');
const verifyToken = require('../middlewares/auth-middleware');


router.get('/board', async (req, res) => {
    const goods = await Goods.find({}, { _id: 0, nickname: 1, title: 1, date: 1 })
        .sort("-date").exec();

    if (goods) {
        return res.status(200).json({ goods: goods });
    } else {
        return res.status(400).json({ Errormessage: '게시글 조회 실패' });
    }
});

router.post("/board", async (req, res) => {
    console.log(req.body);
    const { title, content, nickname } = req.body;
    await Goods.create({ title: title, content: content, nickname: nickname });
    return res.status(201).json({ result: 'success' });
});

router.get('/board/:id', async (req, res) => {
    const { id } = req.params;

    const boards = await Goods.find({ id: id }, { title: 1, id: 1, date: 1 }).exec();

    // const boards = await Goods.find({goodsId}, { title: 1, id: 1, date: 1 });
    if (boards.length > 0) {
        return res.status(200).json({ boards });
    } else {
        return res.status(400).json({ result: "fail" });
    }
});

router.put('/board/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content, pw } = req.body;

    const currentBoard = await Goods.findOne({ title: title });
    if (currentBoard.id !== id) {
        return res.status(404).json({ result: "Post Not Found" });
    }
    if (currentBoard.pw !== pw) {
        return res.status(404).json({ result: "비밀번호가 틀립니다" });
    }
    currentBoard.content = content;
    currentBoard.title = title;
    await currentBoard.save();
    return res.status(200).json({ result: '넌 완벽히 해냈어!' });
});

router.delete('/board/:id', async (req, res) => {
    const { id } = req.params;
    const { title, pw } = req.body;

    const currentId = await Goods.findOne({ title: title, id: id })
    if (currentId) {
        if (currentId.pw !== pw) {
            return res.status(404).json({ result: "비밀번호가 틀립니다" });
        } else {
            await Goods.deleteOne({ title, id });
            return res.status(200).json({ result: "너는 해내고야 말았어" });
        }
    } else {
        return res.status(404).json({ result: "Fail" });
    }

})

module.exports = router;