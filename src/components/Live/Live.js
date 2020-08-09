import React, { useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import ReactTwitchEmbedVideo from 'react-twitch-embed-video'
import api from '../../api'
import styles from './Live.module.css'

const Live = () => {
    const { streamer } = useParams()

    const [ infoStream, setInfoStream ] = useState([])
    const [ infoGame, setInfoGame ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?user_login=${streamer}`)

            if (result.data.data.length === 0) {
                setInfoStream(false)
            } else {
                const gameId = result.data.data.map(gameId => {
                    return gameId.game_id
                })

                const resultNameGame = await api.get(`https://api.twitch.tv/helix/games?id=${gameId}`)

                const nameGame = resultNameGame.data.data.map(gameName => {
                    return gameName.name
                })

                setInfoGame(nameGame)
                setInfoStream(result.data.data[0])
            }
        }
        fetchData()
    }, [streamer])

    return (
       infoStream ? 
       <div className={styles.ContainerDecale}>
            <ReactTwitchEmbedVideo heigth='754' width='100%' channel={streamer} />
            <div className={styles.ContInfo}>
                <div className={styles.TitreStream}>{infoStream.title}</div>
                <div className={styles.Viewer}>Viewers : {infoStream.viewer_count}</div>
                <div className={styles.InfoGame}>Streamer : {infoStream.user_name}, &nbsp; Langue : {infoStream.language}</div>
                <div className={styles.NameGame}>Jeu : {infoGame}</div>
            </div>
        </div>  
        :
        <div className={styles.ContainerDecale}>
            <ReactTwitchEmbedVideo heigth='754' width='100%' channel={streamer} />
            <div className={styles.ContInfo}>
                <div className={styles.TitreStream}>Le Streamer est offline !</div>
            </div>
        </div> 
    ) 
}

export default Live