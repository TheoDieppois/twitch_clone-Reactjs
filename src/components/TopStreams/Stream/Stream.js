import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Stream.module.css'


const Stream = props => {
    return (
        <>
            <div className={styles.CardStream}>
                <img src={props.channel.thumbnail_url} alt="jeu Profile pic" className={styles.ImgCarte}/>
                <div className={styles.CardBodyStream}>
                    <h5 className={styles.TitleCardStream}>{props.channel.user_name}</h5>
                    <p className={styles.TextStream}>{props.channel.gameName}</p>
                    <p className={styles.TextStream + styles.Viewers}>Viewers : {props.channel.viewer_count}</p>
                    <Link className={styles.Lien} to={{ 
                        pathname : `/live/${props.channel.login}`
                    }}>
                        <div className={styles.BtnCard}>Regarder {props.channel.user_name}</div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Stream