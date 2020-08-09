import React, { useState, useEffect } from 'react'
import api from '../../api'
import Stream from './Stream/Stream'
import styles from '../Games/Games.module.css'


const TopStreams = () => {
    const [ channels, setChannels ] = useState([])

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
                const newUrl = stream.thumbnail_url
                    .replace('{width}', '320')
                    .replace('{height}', '180')
                stream.thumbnail_url = newUrl

                return stream
            }) 
            setChannels(finalArray)
        }
        fetchData()
    }, [])
    console.log(channels)

    return (
        <div>
            <h1 className={styles.TitreGames}>Stream les plus populaires</h1>
            <div className={styles.FlexAccueil}>
                {channels.map(channel => (
                    <Stream key={channel.id} channel={channel} />
                ))}
            </div>
        </div>
    )
}

export default TopStreams