const mongoose = require('mongoose');
const conn_url = 'mongodb://127.0.0.1:27017/music_stream_api';
mongoose.connect(conn_url, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify: true
});