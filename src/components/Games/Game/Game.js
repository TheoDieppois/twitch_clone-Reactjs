import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Game.module.css'


const Game = props => {
    return (
        <>
            <div className={styles.CardGames}>
                <img src={props.url} alt="jeu Profile pic" className={styles.ImgCarte}/>
                <div className={styles.CardBodyGames}>
                    <h5 className={styles.TitleCardGames}>{props.name}</h5>
                    <Link
                        className={styles.Lien}
                        to={{
                            pathname : `game/${props.name}`,
                            state : {
                                gameId : props.gameId
                            }
                        }}
                    >
                        <div className={styles.BtnCard}>Regarder {props.name}</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Game