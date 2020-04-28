const mongoose = require('mongoose');

const audioSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    artist:{
        type: String,
        required: true
    },
    album:{
        type: String
    },
    tags:{
        type: String
    },
    description:{
        type: String
    },
    url:{
        type: String,
        required: true
    },
    images:{
        type: String
    },
    uploaded_by:{
        type: String,
        required: true
    }
});

const Audio = mongoose.model('Audio', audioSchema);

module.exports = Audio;