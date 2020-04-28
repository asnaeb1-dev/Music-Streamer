const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET_KEY = '!!MUSIC_STREAMER!!'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email address');
            }
        }
    },
    password:{
        type: String,
        required:true,
        minlength: 8,
        validate(value){
            if(value==='password'){
                throw new Error('Password cannot contain "password"!');
            }
        }
    },
    genres_liked:[{
            genre:{
                type: String,
                trim: true
            }
        }
    ],
    tokens:[{
        token: {
            type: String,
        }
    }]
});

userSchema.pre('save', async function(next){
    //hash the password if it has been modifies
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 8)
    }
    next();
})

userSchema.methods.generateAuthToken = async function(){
    const token = await jwt.sign({_id: this._id.toString()}, SECRET_KEY);
    this.tokens.push({token})
    await this.save();
    return token;
}

userSchema.methods.publicProfile = function(){
    const user = this.toObject();
    delete user.password;
    delete user.tokens;

    return user;
}

userSchema.statics.findByCredentials = async function(email, password){
    const user = await User.findOne({email})
    if(!user){
        throw new Error('User not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Incorrect password')
    }
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;