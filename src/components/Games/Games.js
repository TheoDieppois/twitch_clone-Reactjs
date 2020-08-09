import React, { useState, useEffect } from 'react'
import api from '../../api'
import Game from './Game/Game'
import styles from './Games.module.css'


const Games = () => {
    const [ games, setGames ] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')
            console.log(result)
            const dataArray = result.data.data
            const finalArray = dataArray.map(game => {
                let newUrl = game.box_art_url
                    .replace("{width}", "250")
                    .replace("{height}", "300")
                game.box_art_url = newUrl
                return game
            })

            setGames(finalArray)
        }

        fetchData()
    }, [])
    return (
        <div>
            <h1 className={styles.TitreGames}>Jeux les plus populaires</h1>
            <div className={styles.FlexAccueil}>
                {games.map(game => (
                    <Game key={game.id} url={game.box_art_url} name={game.name} gameId={game.id}/>
                ))}
            </div>
        </div>
    )
}

export default Games