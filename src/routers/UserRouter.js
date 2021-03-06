const express = require('express');
const router = new express.Router();

const User = require('./../models/UserModel');
const authentication = require('./../Auth/auth');

//create a user
router.post('/user/create', async function(request, response){
    const user = new User(request.body);
    try{
        const token = await user.generateAuthToken();
        await user.save();
        response.status(201).send({
            user: user.publicProfile(),
            token
        })
    }catch(e){
        response.status(400).send({err_code: 0,message: e.message})
    }
})

//login user
router.post('/user/login', async function(request, response){
    try{
        const user = await User.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateAuthToken();
        response.send({user: user.publicProfile(), token});
    }catch(e){
        if(e.message === 'User not found'){
            response.status(404).send({err_code: 1, message: e.message})
        }else{
            response.status(400).send({err_code: 2, message: e.message})
        }
    }
})

//update user
router.patch('/user/update', authentication, async function(request, response){
    const allowedUpdates = ['username', 'email', 'password'];
    const keys = Object.keys(request.body);

    keys.forEach(key => {
        if(!allowedUpdates.includes(key)){
            return response.status(400).send({message: 'failure', err_code: '3'})
        }
    })
    try{
        const userF = request.user;
        keys.forEach(key => userF[key] = request.body[key])
        await userF.save();
        response.status(200).send(userF)
    }catch(e){
        console.log(e);
        response.status(500).send({message: e.message})
    }
})

//delete user
router.delete('/user/delete', authentication, async function(request, response){
    try{
        const user = await request.user.remove();
        response.send(user.publicProfile())
    }catch(e){
        response.status(404).send({message: e.message});
    }
})

//get user profile
router.get('/user/me', authentication, async function(request, response){
    try{
        response.send(request.user);
    }catch(e){
        response.status(404).send({message: e.message})
    }
})

//update audio liked by user
router.post('/user/addgenre', authentication, async function(request, response){
    const genre = request.body.genre;
    try{
        request.user.genres_liked.push({genre});
        await request.user.save();
        response.send(request.user.genres_liked);
    }catch(e){
        response.status(400).send({message: e.message});
    }
})

router.get('/user/genres', authentication, async function(request, response){
    try{
        const genres = request.user.genres_liked;
        response.send(genres);
    }catch(e){
        response.status(404).send({message: e.message});
    }
})

//delete audio liked by user
router.delete('/user/deletegenre/:id', authentication, async function(request, response){
    try{
        request.user.genres_liked = request.user.genres_liked.filter((genre) => genre.genre !== request.params.id)
        await request.user.save();
        response.send(request.user.genres_liked);
    }catch(e){
        response.status(404).send({message: e.message});
    }
})

//logout
router.get('/user/logout', authentication, async function(request, response){
    try{
        request.user.tokens = request.user.tokens.filter((token) => token.token!==request.token)
        await request.user.save();
        response.status(200).send({message : "logged_out", name: request.user.name})

    }catch(e){
        response.status(500).send({message: e.message})
    }
})

module.exports = router;

