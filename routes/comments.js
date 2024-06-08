
/**
 * @swagger
 * /board/{postId}/comments:
 *   get:
 *     summary: 댓글 목록 조회
 *     description: 게시글에 작성된 모든 댓글을 목록 형식으로 조회합니다. 작성 날짜 기준으로 내림차순 정렬합니다.
 *     tags: [Comments]
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
 *     summary: 댓글 작성
 *     description: 게시글에 댓글을 작성합니다. 작성 내용(content)과 작성자의 비밀번호(pw)를 입력해야 합니다.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
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
 *               content:
 *                 type: string
 *                 description: 댓글 내용
 *               pw:
 *                 type: string
 *                 description: 작성자 비밀번호
 *     responses:
 *       200:
 *         description: 성공적으로 댓글이 작성되었습니다.
 *       400:
 *         description: 댓글 내용이 비어있는 경우
 */


/**
 * @swagger
 * /board/comments/{commentId}:
 *   put:
 *     summary: 댓글 수정
 *     description: 게시글에 작성된 댓글을 수정합니다. 댓글 ID를 사용하여 수정할 댓글을 식별하고, 수정할 내용(content)을 입력해야 합니다.
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: 수정할 댓글 내용
 *     responses:
 *       200:
 *         description: 댓글 수정이 성공적으로 수행되었습니다.
 *       400:
 *         description: 댓글 내용이 비어있는 경우
 *       404:
 *         description: 주어진 댓글 ID로 댓글을 찾을 수 없는 경우
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

comment_router.put("/board/comments/:commentId", async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    if (content.length <= 0) {
        return res.status(400).json({ ErrorMessage: "내용이 비어있습니다." });
    }
    const currentUser = await Comments.findOne({ _id: commentId });
    if (currentUser) {
        currentUser.content = content;
        await currentUser.save();
        return res.status(200).json({ result: "으하하하하하하 해냈도다" });
    }
    return res.status(400).json({ ErrorMessage: "에러 입니다." })

});


module.exports = comment_router;