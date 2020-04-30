const jwt = require('jsonwebtoken');
const User = require("./../models/UserModel");

const auth = async function(request, response, next){
    try{
        const token = request.header('Authorization'). replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({_id: decoded._id, 'tokens.token': token})
        if(!user){
            throw new Error();
        }
        request.user = user;
        request.token = token;
        next();
    
    }catch(e){
        response.status(401).send({message: 'please authenticate'})
    }
}

module.exports = auth;