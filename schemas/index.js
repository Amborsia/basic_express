const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb://localhost:27017/board')
        .catch(err => console.log('몽고db 에러!!!!'));
};

mongoose.connection.on("error", err => {
    console.error(
        "몽고디비 연결에러"
    );
});

module.exports = connect;