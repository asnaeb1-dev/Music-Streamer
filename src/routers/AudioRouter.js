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

//search for audio information
// {baseURL}/audio/search?trackname={trackname}&trackartist={trackartists}
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
router.delete('/audio/remove/:id', authentication, async function(request, response){
    const audioID = request.params.id;
    try{
        const audio = await Audio.findOne({uploaded_by: request.user._id, _id: audioID})
        if(!audio){
            throw new Error('Audio not found');
        }
        await audio.remove();
        response.send('removed')
    }catch(e){
        response.status(404).send(e);
    }
})

//specialized audio removal route
router.delete('/audio/delete', authentication, async function(request,response){

})

//get audio
//attach pagination to this!!!!!TODO!!!!!
router.get('/audio/all', authentication, async function(request, response){
    try{
        const audios = await Audio.find({});
        response.send(audios);
    }catch(e){
        response.status(404).send(e);
    }
})

//get audio uploaded by user
router.get('/audio/me', authentication, async function(request, response){
    try{
        const audios = await Audio.find({uploaded_by: request.user._id})
        response.send(audios);
    }catch(e){
        response.status(404).send(e);
    }
})

// /audio/find?t={title}
router.get('/audio/find', authentication, async function(request, response){
    try{
        const audio = await Audio.findOne({title: request.query.t})
        response.send(audio);
    }catch(e){
        response.status(404).send(e)
    }
})

// /audio/find?id={id}
router.get('/audio/findid', authentication, async function(request, response){
    try{
        const audio = await Audio.findOne({_id: request.query.id})
        response.send(audio);
    }catch(e){
        response.status(404).send(e)
    }
})

// /audio/find?artist={artist}
router.get('/audio/findArtist', authentication, async function(request, response){
    try{
        const audio = await Audio.find({artist: request.query.artist})
        response.send(audio);
    }catch(e){
        response.status(404).send(e)
    }
})

// /audio/find?album={album}
router.get('/audio/findAlbum', authentication, async function(request, response){
    try{
        const audio = await Audio.find({album: request.query.album})
        response.send(audio);
    }catch(e){
        response.status(404).send(e)
    }
})

module.exports = router;

