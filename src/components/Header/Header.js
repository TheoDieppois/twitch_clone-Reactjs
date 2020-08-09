import React, { useState, useEffect } from 'react'
import logo from './IconeTwitch.svg'
import search from './Search.svg'
import menuIco from './MenuIco.svg'
import croix from './Croix.svg'
import { Link } from 'react-router-dom'
import styles from './Header.module.css'


const Header = () => {
    const [menu, showMenu] = useState(false)
    const [smallScreen, setSmallScreen] = useState(false)
    const [searchInput, setSearchInput] = useState('')



    const toggleNavRes = () => {
        showMenu(!menu)
    }

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width : 900px)')
        // addListener est comme addEventListener mais pour les media queries JS
        mediaQuery.addListener(handleMediaQueryChange)
        handleMediaQueryChange(mediaQuery)

        return () => {
            mediaQuery.removeListener(handleMediaQueryChange)
        }
    })

    const handleMediaQueryChange = mediaQuery => {
        if(mediaQuery.matches) {
            setSmallScreen(true)
        } else {
            setSmallScreen(false)
        }
    }

    const hideMenu = () => {
        if (menu === true) {
            showMenu(!menu)
        }
    }

    const handleSubmit = () => {
        
    }

    const handleKeypress = (e) => {
        setSearchInput(e.target.value)
    }

    return (
        <div>
            <nav className={styles.HeaderTop}>
                {(menu || !smallScreen) && (
                <ul className={styles.ListeMenu}>
                    <li onClick={hideMenu} className={styles.LiensNav}>
                        <Link className={styles.Lien} to='/'>
                            <img src={logo} alt="logo Twitch" className={styles.Logo}/>  
                        </Link>
                    </li>
                    <li onClick={hideMenu}  className={styles.LiensNav}>
                        <Link className={styles.Lien} to='/'>
                            Top Games
                        </Link>
                    </li>
                    <li onClick={hideMenu}  className={styles.LiensNav}>
                    <Link className={styles.Lien} to='/topstreams'>
                        Top Streams
                    </Link>
                    </li>
                    <li className={styles.LiensNav}>
                        <form className={styles.FormSubmit} onSubmit={handleSubmit}>
                            <input required value={searchInput} type="text" className={styles.InputRecherche} onChange={(e) => handleKeypress(e)}/>
                            <Link
                            className={styles.Lien}
                            to={{
                                pathname : `/resultat/${searchInput}`
                            }}>
                                <button type='submit'>
                                    <img src={search} alt="icone loupe" className={styles.LogoLoupe}/>
                                </button>
                            </Link>
                        </form>
                    </li>
                </ul>
                )}
            </nav>
            <div className={styles.MenuResBtn}>
                <img onClick={toggleNavRes} src={!menu ? menuIco : croix} alt="Icone menu responsive" className={styles.MenuIco}/>
            </div>
        </div>
    )
}

export default Header