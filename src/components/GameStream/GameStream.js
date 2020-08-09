import React, { useState, useEffect } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import api from '../../api'
import styles from './GameStream.module.css'


const GameStream = () => {
    let {game} = useParams()
    let location = useLocation()

    const [ streamData, setStreamData ] = useState([])
    const [ viewers, setViewers ] = useState(0)

    console.log(game, 'slug')

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=${location.state.gameId}`)
            
            const dataArray = result.data.data

            let finalArray = dataArray.map(stream => {
                let newUrl = stream.thumbnail_url
                    .replace('{width}', '320')
                    .replace('{height}', '180')
                stream.thumbnail_url = newUrl
                return stream
            })

            const totalViewer = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count
            }, 0)

            const userIDs = dataArray.map(stream => {
                return stream.user_id
            })

            const baseUrl = 'https://api.twitch.tv/helix/users?'
            let queryParamsUsers = ''
            
            userIDs.map(id => {
                return (queryParamsUsers = queryParamsUsers + `id=${id}&`)
            })

            const finalUrl = baseUrl + queryParamsUsers
            const getUsersLogin = await api.get(finalUrl)
            const userLoginArray = getUsersLogin.data.data

            finalArray = dataArray.map(stream => {
                stream.login = ''
                userLoginArray.forEach(login => {
                    if (stream.user_id === login.id) {
                        stream.login = login.login
                    }
                })
                return stream
            })
            setViewers(totalViewer)
            setStreamData(finalArray)
        }
        fetchData()
    }, [location.state.gameId])


    return (
        <div>
            <h1 className={styles.TitreGamesStreams}>Stream : {game}</h1>
            <h3 className={styles.SousTitreGamesStreams}>
                <strong className={styles.TextColored}>{viewers}</strong> personnes regardent {game} 
            </h3>

            <div className={styles.FlexAccueil}>
                {streamData.map(stream => (
                    <div key={stream.id} className={styles.CardGameStreams}>
                        <img src={stream.thumbnail_url} alt="jeu carte img" className={styles.ImgCard}/>
                        <div className={styles.CardBodyGameStreams}>
                            <h5 className={styles.TitleCardStream}>{stream.user_name}</h5>
                            <p className={styles.TxtStream}>Nombre de viewers : {stream.viewer_count}</p>

                            <Link
                            className={styles.Lien}
                            to={{
                                pathname : `/live/${stream.login}`
                            }}>
                                <div className={styles.BtnCard}>Regarder {stream.user_name}</div>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameStream