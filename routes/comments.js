
/**
 * @swagger
 * /board/{postId}/comments:
 *   get:
 *     summary: 댓글 목록 조회
 *     description: 게시글에 작성된 모든 댓글을 목록 형식으로 조회합니다. 작성 날짜 기준으로 내림차순 정렬합니다.
 *     tags: [comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 댓글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: 댓글 목록 조회 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   example: "fail"
 */

/**
 * @swagger
 * /board/{postId}/comments:
 *   post:
 *     summary: 댓글작성
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
 *       400:
 *         description: Comment content is required
 */

/**
 * @swagger
 * /board/{postId}/comments/{commentId}:
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
 *       400:
 *         description: Comment content is required
 */

/**
 * @swagger
 * /board/{postId}/comments/{commentId}:
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
 */


const express = require('express');
const Comments = require('../schemas/comment');
const comment_router = express.Router();

comment_router.get("/board/:postId/comments", async (req, res) => {
    const { postId } = req.params;
    const comments = await Comments.find({}, { _id: 0, id: 1, content: 1, date: 1 })
        .sort("-date").exec();

    if (comments.length > 0) {
        return res.status(200).json({ comments });
    } else {
        return res.status(400).json({ result: "fail" });
    }
});

comment_router.post("/board/:postId/comments", async (req, res) => {
    const { postId } = req.params;
    const { content, pw } = req.body;
    if (content.length <= 0) {
        return res.status(400).json({ result: "댓글 내용을 입력해주세요" })
    } else {
        await Comments.create({ id: postId, date: Date.now(), content: content, pw: pw });

        return res.status(200).json({ result: "너는 못할줄 알았지만 해냈단다." });
    };
})

module.exports = comment_router;