
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
 *     summary: 전체 게시글 목록 조회
 *     tags: [post]
 *     responses:
 *       200:
 *         description: 전체 게시글 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   
 */

/**
 * @swagger
 * /board:
 *   post:
 *     summary: 게시글 작성 API
 *     tags: [post]
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *                title:
 *                  type: string
 *                name:
 *                  type: string
 *                pw:
 *                  type: string
 *                content:
 *                  type: string                     
 *     responses:
 *       201:
 *        description: 게시글 작성
 *                   
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
module.exports = router;