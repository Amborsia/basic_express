/**
 * @swagger
 * components:
 *   schemas:
 *     BoardSummary:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         nickname:
 *           type: string
 *         title:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *     BoardDetail:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *         nickname:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 *         content:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Board
 *   description: Board management
 */

/**
 * @swagger
 * /board:
 *   get:
 *     summary: Retrieves all board posts
 *     tags: [Board]
 *     responses:
 *       200:
 *         description: The list of board posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/BoardSummary'
 *       400:
 *         description: Error message
 */

/**
 * @swagger
 * /api/board:
 *   post:
 *     summary: Creates a new board post
 *     tags: [Board]
 *     security:
 *       - bearerAuth: []
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
 *     responses:
 *       201:
 *         description: Successfully created
 *       400:
 *         description: Error message
 */

/**
 * @swagger
 * /api/board/{id}:
 *   get:
 *     summary: Retrieves a board post by ID
 *     tags: [Board]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board post ID
 *     responses:
 *       200:
 *         description: The board post description by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/Board'
 *       400:
 *         description: Error message
 */

/**
 * @swagger
 * /api/board/{id}:
 *   put:
 *     summary: Updates a board post by ID
 *     tags: [Board]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Successfully updated
 *       400:
 *         description: Error message
 */

/**
 * @swagger
 * /api/board/{id}:
 *   delete:
 *     summary: Deletes a board post by ID
 *     tags: [Board]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The board post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Successfully deleted
 *       404:
 *         description: Error message
 */


const express = require('express');
const router = express.Router();
const Goods = require('../schemas/post');
const verifyToken = require('../middlewares/auth-middleware');


router.get('/board', async (req, res) => {
    const board = await Goods.find({}, { _id: 1, nickname: 1, title: 1, date: 1 })
        .sort("-date").exec();
    console.log("보드 겟 요청 시작합니당");
    if (board) {
        return res.status(200).json({ board: board });
    } else {
        return res.status(400).json({ Errormessage: '게시글 조회 실패' });
    }
});

router.post("/board", verifyToken, async (req, res) => {
    console.log(req.body);
    const { title, content } = req.body;
    await Goods.create({ title: title, content: content, email: req.user.email, nickname: res.locals.nickname });
    return res.status(201).json({ result: 'success' });
});

router.get('/board/:id', async (req, res) => {
    const { id } = req.params;
    const boards = await Goods.find({ email: id }, { _id: 0, title: 1, nickname: 1, date: 1, content: 1 }).exec();
    // const boards = await Goods.find({goodsId}, { title: 1, id: 1, date: 1 });
    if (boards.length > 0) {
        return res.status(200).json({ boards });
    } else {
        return res.status(400).json({ result: "fail" });
    }
});

router.put('/board/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { content, date } = req.body;

    const currentBoard = await Goods.findOne({ date: date });
    currentBoard.content = content;
    await currentBoard.save();
    return res.status(200).json({ result: '넌 완벽히 해냈어!' });
});

router.delete('/board/:id', verifyToken, async (req, res) => {
    const { id } = req.params;
    const { date } = req.body;

    const currentId = await Goods.findOne({ email: id, date: date })
    if (currentId) {

        await Goods.deleteOne({ date });
        return res.status(200).json({ result: "너는 해내고야 말았어" });

    } else {
        return res.status(404).json({ result: "Fail" });
    }

})

module.exports = router;