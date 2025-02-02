import { useEffect } from 'react';
import styles from './Home.module.scss'
import components_styles from '../../styles/Components.module.scss'
// import { Link } from 'react-router';
import { HashLink as Link } from 'react-router-hash-link';


function Home({ setHideSidebarButton }) {

    let data = [
        { title: 'Study Resources', desc: 'Access essential materials for your study sessions', path: 'resources' },
        { title: 'Media Library', desc: 'Explore videos, podcasts, and more to enhance your Japanese learning!', path: 'media' },
        { title: 'Software / Applications', desc: 'Discover useful software and applications to aid your Japanese learning!', path: 'applications' },
        { title: 'And more to come', desc: 'Stay tuned for more resources and updates!' }
    ];

    let shortcuts = [

        { category: 'Beginner Essentials', path: 'resources#beginner_id', parent: 'resources' },
        { category: 'Reading', path: 'resources#reading_id', parent: 'resources' },
        { category: 'Culture', path: 'media#Culture_id', parent: 'media' },
        { category: 'Podcast', path: 'media#Podcast_id', parent: 'media' },
        { category: 'Flashcards', path: 'applications#Flashcards_id', parent: 'applications' },
        { category: 'Tools', path: 'applications#Tools_id', parent: 'applications' },
    ];

    function disableIsHome() {
        setHideSidebarButton(false)
    }

    useEffect(() => {
        setHideSidebarButton(true);
    }, [setHideSidebarButton])

    return (
        <>
            <div className={styles["home-wrapper"]}>
                <div className={styles['main-page-logo']}>
                    <a href="/"><span className={styles['logo']}></span>やめだめ</a>
                    <p>No excuses not to learn Japanese</p>
                </div>
                <div className={styles["resource-container"]}>
                    {data.map((card, i) => (
                        <div key={i} className={styles["resource-card"]}>
                            {card.path == 'resources' ? <span>📖</span> :
                                card.path == 'media' ? <span>💾</span> :
                                    card.path == 'applications' ? <span>💻</span> : <span>✨</span>}
                            {!card.path ?
                                <div className={styles["resource-card-title"]}>{card.title}</div> :
                                <Link to={`/${card.path}`} onClick={disableIsHome} className={styles["resource-card-title"]}>{card.title}</Link>}
                            <p>{card.desc}</p>
                            <div className={styles['shortcuts-container']}>
                                {shortcuts.map((shortcut, i) => (
                                    card.path == shortcut.parent ?
                                        <Link to={`/${shortcut.path}`} onClick={disableIsHome} key={i} className={`${styles["shortcut"]} ${components_styles.btn}`} >
                                            {shortcut.category}
                                        </Link> : null
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles["extra-container"]}>
                    <Link to='/about' className={`${components_styles['extra-links']} ${components_styles.btn}`}>About</Link>
                    <a className={`${components_styles['extra-links']} ${components_styles.btn}`} href='https://ko-fi.com/H2H0QZVAZ' target='_blank'>Donate</a>
                </div>
            </div >
        </>
    )
}

export default Home;