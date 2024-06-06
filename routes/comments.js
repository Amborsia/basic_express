
/**
 * @swagger
 * /board/{postId}/comments:
 *   get:
 *     summary: 댓글 목록을 조회
 *     description: 날짜 내림차순으로 보여줌
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
const comment_router = express.Router();
module.exports = comment_router;