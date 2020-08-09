import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Stream.module.css'


const Stream = props => {
    return (
        <>
            <Link 
            className={styles.Lien}
            to={{
                pathname : `/live/${props.stream.login}`
            }}>
                <li className={styles.ContainerFlexSidebar}>
                    <img src={props.stream.truePic} alt="logo user" className={styles.ProfilePicRound}/>
                    <div className={styles.StreamUser}>{props.stream.user_name}</div>
                    <div className={styles.ViewerRight}>
                        <div className={styles.PointRouge}></div>
                        <div>{props.stream.viewer_count}</div>
                    </div>
                    <div className={styles.GameNameSidebar}>{props.stream.gameName}</div>
                </li>
            </Link>
        </>
    )
}

export default Stream