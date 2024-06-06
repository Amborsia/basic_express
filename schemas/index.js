const express = require("express");
const app = express();
app.use(express.json());

let boardDB = [
    { number: 1, writer: "철수", date: "2023-06-06" },
    { number: 2, writer: "영희", date: "2023-06-08" },
    { number: 3, writer: "길동", date: "2023-06-09" }
]

app.get("/boards/:id", (req, res) => {
    const id = req.params.id;
    const query = req.query.number;
    const result = boardDB.find(x => {
        return x.number == id;
    });
    res.status(200).send(result);
});