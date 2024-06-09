const mongoose = require('mongoose');

const connect = () => {
    mongoose.connect('mongodb+srv://ghdrms1220:test@cluster0.u8jwhhi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        .catch(err => console.log('몽고db 에러!!!!'));
};

mongoose.connection.on("error", err => {
    console.error(
        "몽고디비 연결에러"
    );
});

module.exports = connect;