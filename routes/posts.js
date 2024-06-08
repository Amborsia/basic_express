
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

/**
 * @swagger
 * /board/{id}:
 *   get:
 *     summary: 게시글 조회 post
 *     description: 제목, 작성자, 작성된 날짜 및 내용이 있는 게시물을 검색합니다.
 *     tags: [post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: POST ID
 *     responses:
 *       200:
 *         description: 게시글 조회
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 name:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 content:
 *                   type: string
 * 
 * 
 *                   
 */

/**
 * @swagger
 * /board/{id}:
 *   put:
 *     summary: 게시글 수정 API
 *     description: 비밀번호가 같다면 포스트를 수정합니다 response body로 pw를 받기때문에 url은 id로 넣습니다
 *     tags: [post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: POST ID
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                title:
 *                  type: string
 *                content:
 *                  type: string
 *                pw:
 *                  type: string
 *     responses:
 *       200:
 *        description: 게시글 수정 완료
 *       400:
 *        descriptrion: 비밀번호 같지 않음
 *                   
 */

/**
 * @swagger
 * /board/{id}:
 *   delete:
 *     summary: 게시글 삭제 API
 *     description: 비밀번호가 같다면 포스트를 삭제합니다
 *     tags: [post]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: POST ID
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                pw:
 *                  type: string
 *     responses:
 *       200:
 *        description: 게시글 삭제 완료
 *       400:
 *        descriptrion: 비밀번호 같지 않음
 *                   
 */






const express = require('express');
const router = express.Router();
const Goods = require('../schemas/post');


router.get('/board', async (req, res) => {
    const goods = await Goods.find({}, { id: 1, title: 1, date: 1 })
        .sort("-date").exec();

    if (goods) {
        return res.status(200).json({ goods: goods });
    } else {
        return res.status(400).json({ Errormessage: '게시글 조회 실패' });
    }
});

router.post("/board", async (req, res) => {
    console.log(req.body);
    const { title, id, pw, content } = req.body;
    await Goods.create({ title: title, id: id, pw: pw, content: content });
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

module.exports = router;