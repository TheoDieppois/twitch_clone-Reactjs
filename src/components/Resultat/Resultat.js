import React, { useState, useEffect }  from 'react'
import { Link, useParams } from 'react-router-dom'
import Error from '../Error/Error'
import api from '../../api'
import styles from './Resultat.module.css'


const Resultat = () => {

    let { slug } = useParams()

    const [ result, setResult ] = useState(true)
    const [ streamerInfo, setStreamerInfo ] = useState([])

    let cleanSearch = slug.replace(/ /g,'')

    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get(`https://api.twitch.tv/helix/users?login=${cleanSearch}`)

            if (result.data.data.length === 0) {
                setResult(false)
            } else {
                setStreamerInfo(result.data.data)
            }
        }
        fetchData()
    },[cleanSearch])

    return (
        result ? 
        <div className={styles.ContainerDecaleResultats}>
            <h4>Résultat de recherche : </h4>
            {streamerInfo.map(stream => (
                <div className={styles.CardResults}>
                    <img src={stream.profile_image_url} alt="" className={styles.ImgCard}/>
                    <div className={styles.CardBodyResults}>
                        <h5 className={styles.TitleCardStream}>{stream.display_name}</h5>
                        <div className={styles.TxtResult}>
                            {stream.description}
                        </div>

                        <Link
                        className={styles.Lien}
                        to={{
                            pathname : `/live/${stream.login}`
                        }}>
                            <div className={styles.BtnResult}>Regarder {stream.display_name}</div>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        : <Error/>
    )
}

export default Resultat