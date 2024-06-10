/**
 * @swagger
 * /api/comments/{postId}:
 *   get:
 *     summary: 댓글 목록을 조회
 *     description: 날짜 내림차순으로 댓글을 조회합니다.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   content:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 */

/**
 * @swagger
 * /api/comments/{postId}:
 *   post:
 *     summary: 댓글 작성
 *     description: 글에 새로운 댓글을 작성, 만약 비어있다면 에러를 리턴
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "Comment created"
 *       400:
 *         description: Comment content is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Comment content is required"
 */

/**
 * @swagger
 * /api/comments/{commentId}:
 *   put:
 *     summary: 댓글 수정
 *     description: 만약 비어있다면 에러를 리턴, 정상적 처리되면 댓글이 수정됨
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "Comment updated"
 *       400:
 *         description: Comment content is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Comment content is required"
 */

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: 댓글 삭제
 *     description: 댓글을 삭제합니다
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "Comment deleted"
 */




const express = require('express');
const Comments = require('../schemas/comment');
const verifyToken = require('../middlewares/auth-middleware');
const comment_router = express.Router();

comment_router.get("/comments/:postId", async (req, res) => {
    const { postId } = req.params;
    const comments = await Comments.find({}, { _id: 0, id: 1, content: 1, date: 1 })
        .sort("-date").exec();

    if (comments.length > 0) {
        return res.status(200).json({ comments });
    } else {
        return res.status(400).json({ result: "fail" });
    }
});

comment_router.post("/comments/:postId", verifyToken, async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    if (content.length <= 0) {
        return res.status(400).json({ result: "댓글 내용을 입력해주세요" })
    } else {
        await Comments.create({ id: postId, date: Date.now(), content: content });

        return res.status(200).json({ result: "너는 못할줄 알았지만 해냈단다." });
    };
})

comment_router.put("/comments/:commentId", verifyToken, async (req, res) => {
    const { commentId } = req.params;
    const { content, date } = req.body;
    if (content.length <= 0) {
        return res.status(400).json({ ErrorMessage: "내용이 비어있습니다." });
    }
    const currentUser = await Comments.findOne({ date: date });
    if (currentUser) {
        currentUser.content = content;
        await currentUser.save();
        return res.status(200).json({ result: "으하하하하하하 해냈도다" });
    }
    return res.status(400).json({ ErrorMessage: "에러 입니다." })

});

comment_router.delete("/comments/:commentId", async (req, res) => {
    const { commentId } = req.params;
    const { date } = req.body;
    const currentUser = await Comments.findOne({ date: date, id: commentId });
    if (!currentUser) {
        return res.status(400).json({ result: "fail" });
    } else {
        await currentUser.deleteOne({ date });
        return res.status(200).json({ result: "정상적으로 삭제가 되었다ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ" });
    }
})
module.exports = comment_router;