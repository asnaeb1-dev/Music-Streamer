//SHARED KEY = b77609eac08d4615206f552ad407059d
//REGD TO- asnaeb123408

//http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=989fe373e3ad938499168b3098aa57f2&artist=imagine%20dragons&track=believer&format=json

const fetch = require('node-fetch');

const API_KEY = "989fe373e3ad938499168b3098aa57f2"

const getMusicInformation = async (trackName, trackArtist) =>{
    const baseURL = 'http://ws.audioscrobbler.com/2.0/';
    const response = await fetch(`${baseURL}?method=track.getInfo&api_key=${API_KEY}&artist=${trackArtist}&track=${trackName}&format=json`)
    const result = await response.json();
    return result;
}

module.exports = getMusicInformation;