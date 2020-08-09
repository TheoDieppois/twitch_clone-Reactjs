import axios from 'axios'

const api = axios.create({
    headers : {
        'Client-ID' : '2rlwgambyipcraogkk832tuirojeko',
        'Authorization' : 'Bearer 2tfxzo7rxsdz6b6tpqockxhfb3dye4'
    }
})

export default api