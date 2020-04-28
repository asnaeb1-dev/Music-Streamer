const express = require('express');
const router = new express.Router();

const User = require('./../models/UserModel');
const authentication = require('./../Auth/auth');

//create a user
router.post('/user/create', async function(request, response){
    const user = new User(request.body);
    const token = await user.generateAuthToken();
    try{
        await user.save();
        response.status(201).send({
            user: user.publicProfile(),
            token
        })
    }catch(e){
        console.log(e);
        response.status(400).send({err_code: 0,message: 'failed to create'})
    }
})

//login user
router.post('/user/login', async function(request, response){
    try{
        const user = await User.findByCredentials(request.body.email, request.body.password);
        const token = await user.generateAuthToken();
        response.send({user: user.publicProfile(), token});
    }catch(e){
        response.status(404).send({err_code: 1, message:'user not found'})
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
        response.status(500).send('Failed to update')
    }
})

//delete user
router.delete('/user/delete', authentication, async function(request, response){
    try{
        await request.user.remove();
        response.send({message: 'success', err_code: -1})
    }catch(e){
        response.status(404).send(e);
    }
})

//get user profile
router.get('/user/me', authentication, async function(request, response){
    try{
        response.send(request.user);
    }catch(e){
        response.status(404).send(e)
    }
})

//update audio liked by user
router.post('/user/addgenre', authentication, async function(request, response){

})

//delete audio liked by user
router.delete('/user/deletegenre', authentication, async function(request, response){

})

module.exports = router;

