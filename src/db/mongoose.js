const mongoose = require('mongoose');

mongoose.connect(process.env.CONN_URL, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useFindAndModify: true
});