import React, { useState, useEffect } from 'react'
import api from '../../api'
import Stream from './Stream/Stream'
import styles from './Sidebar.module.css'

const Sidebar = () => {
    const [ topStreams, setTopStreams ] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/streams')
            const dataArray = result.data.data
            const gameIds = dataArray.map(stream => {
                return stream.game_id
            })
            const userIds = dataArray.map(stream => {
                return stream.user_id
            })

            const baseUrlGames = 'https://api.twitch.tv/helix/games?'
            const baseUrlUsers = 'https://api.twitch.tv/helix/users?'

            let queryParamsGames = ''
            let queryParamsUsers = ''

            gameIds.map(id => {
                return (
                    queryParamsGames = queryParamsGames + `id=${id}&`
                ) 
            })
            userIds.map(id => {
                return (
                    queryParamsUsers = queryParamsUsers + `id=${id}&`
                ) 
            })

            const urlGames = baseUrlGames + queryParamsGames
            const urlUsers = baseUrlUsers + queryParamsUsers

            const gamesNames = await api.get(urlGames)
            const usersNames = await api.get(urlUsers)

            const gamesNameArray = gamesNames.data.data
            const usersNameArray = usersNames.data.data

            const finalArray = dataArray.map(stream => {
                stream.gameName = ''
                stream.truePic = ''
                stream.login = ''

                gamesNameArray.forEach(game => {
                    usersNameArray.forEach(user => {
                        if (stream.user_id === user.id && stream.game_id === game.id) {
                            stream.gameName = game.name
                            stream.truePic = user.profile_image_url
                            stream.login = user.login
                        }
                    })
                })
                return stream
            }) 
            setTopStreams(finalArray.slice(0,6))
        }
        fetchData()
    }, [])
    console.log(topStreams)

    return (
        <div className={styles.Sidebar}>
            <h2 className={styles.TitreSidebar}>Chaînes recommandées</h2>
            <ul className={styles.ListesStream}>
                {topStreams.map(stream => (
                    <Stream 
                        key={stream.id} 
                        stream={stream}     
                    />
                ))}
            </ul>
        </div>
    )
}

export default Sidebar