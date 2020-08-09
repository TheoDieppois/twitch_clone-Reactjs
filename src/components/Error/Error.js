import React from 'react'
import styles from './Error.module.css'


const Error = () => {
    return (
        <div className={styles.ContainerDecaleResults}>
            <h4>Résultat de recherche : Pas de resultats, <br/> Vérifiez l'orthographe de votre saisie, ou ce streamer n'éxiste pas</h4>
        </div>
    )
}

export default Error