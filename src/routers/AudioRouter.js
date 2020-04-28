const express = require('express');
const router = new express.Router();

const Audio = require('./../models/AudioModel');
const authentication = require('./../Auth/auth');
const getMusicInfo = require('./../LastFM/lastfmapi');

//put up audio
router.post('/audio/new', authentication, async function(request, response){
    try{
        const audio = new Audio(request.body);
        await audio.save();
        response.status(201).send(audio)
    }catch(e){
        response.status(400).send(e)
    }
})

router.get('/audio/search', async function(request, response){
    const trackname = request.query.trackname;
    const trackartist = request.query.trackartist;
    try{
        const audio = await getMusicInfo(trackname, trackartist);
        response.send(audio);
    }catch(e){
        console.log(e);
        response.status(400).send(e);
    }

})

//remove audio if it is user's audio
router.delete('/audio/remove', authentication, async function(request, response){
    
})

//specialized audio removal route
router.delete('/audio/delete', authentication, async function(request,response){

})

//get audio
router.get('/audio/all', authentication, async function(request, response){

})

//get audio uploaded by user
router.get('/audio/me', authentication, async function(request, response){

})

module.exports = router;

