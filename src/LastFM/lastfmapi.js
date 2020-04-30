const fetch = require('node-fetch');

const getMusicInformation = async (trackName, trackArtist) =>{
    const baseURL = 'http://ws.audioscrobbler.com/2.0/';
    const response = await fetch(`${baseURL}?method=track.getInfo&api_key=${process.env.LASTFM_APIKEY}&artist=${trackArtist}&track=${trackName}&format=json`)
    const result = await response.json();
    return result;
}

module.exports = getMusicInformation;