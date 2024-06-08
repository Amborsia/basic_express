// index.js
const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const dot = require('dotenv');



const app = express();
const port = 4000;
dot.config();

// const userRoutes = require('./users');

const commentRoutes = require('./routes/comments');
const postRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');
const connect = require('./schemas');
// const indexRoutes = require('./routes/index');
// const userRoutes = require('./routes/users');
connect();
// Using routes
// app.use('/api/users', userRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/posts', postRoutes);
app.use(cookieParser());
app.use(express.json()); //json 파싱해서 req.body 만들어줌
app.use("/api", [commentRoutes, postRoutes, authRoutes]);




// Swagger 설정
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'A simple CRUD API application with Express and documented with Swagger',
    },
    servers: [
        {
            url: 'http://13.125.209.146:4000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // API 경로
};

const swaggerSpec = swaggerJsdoc(options);

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 기본 라우트
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});




// npm run dev