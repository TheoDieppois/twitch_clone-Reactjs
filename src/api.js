import axios from 'axios'
import { clientID, token } from './private'

const api = axios.create({
    headers : {
        'Client-ID' : clientID,
        'Authorization' : `Bearer ${token}`
    }
})

/*
    CLIENT_ID = '2rlwgambyipcraogkk832tuirojeko';
    REDIRECT = 'http://127.0.0.1/';

    LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id=2rlwgambyipcraogkk832tuirojeko&redirect_uri=http://localhost:3000/&response_type=token

*/

export default api