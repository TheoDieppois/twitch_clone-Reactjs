import axios from 'axios'
import { clientID, token } from './private'

const api = axios.create({
    headers : {
        'Client-ID' : clientID,
        'Authorization' : `Bearer ${token}`
    }
})

export default api