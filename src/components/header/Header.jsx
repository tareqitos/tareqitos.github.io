import { AtSymbolIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import styles from './Header.module.scss'
import sidebar_styles from '../sidebar/Sidebar.module.scss'
import components_styles from '../../styles/Components.module.scss'

function Header({ theme, toggleTheme, sidebarActive, setSidebarActive, hideSidebarButton }) {

    return (
        <>
            <div onClick={() => setSidebarActive(false)}
                className={`${sidebar_styles['sidebar-bg']} ${sidebarActive ? sidebar_styles['fade-in'] : sidebar_styles['fade-out']}`}>
            </div>
            <header className={styles['header']}>
                <div className={styles['title']}>
                    <a href="/"><span className={styles['logo']}></span>やめだめ<span className={styles['exclamation-mark']}>!!</span></a>
                </div>

                <div className={styles['form-container']}>
                </div>

                <div className={styles['header-right-side']}>
                    <hr className={styles['hr']} />
                    <button onClick={() => toggleTheme()} className={components_styles['theme-toggle']}> {theme == 'dark' ? <MoonIcon className={components_styles['h-icon']} /> : <SunIcon className={components_styles['h-icon']} />}</button>
                    <hr className={styles['hr']} />
                    <div className={components_styles['socials']}>
                        <a href="https://github.com/tareqitos/yamedame.github.io" target="_blank" className={styles['social-link']}><i className={`fa-brands fa-github`}></i></a>
                        <a href="mailto:social@tareqitos.com" className={styles['social-link']}><AtSymbolIcon className={components_styles['h-icon']} /></a>
                    </div>
                </div>
                {!hideSidebarButton ? 
                <div className={sidebar_styles['sidebar-btn-container']}>
                    <button onClick={() => setSidebarActive(true)} className={`${sidebar_styles['sidebar-btn']} ${sidebar_styles['open']}`}><i className={`fa-solid fa-bars`}></i></button>
                </div> : null}
            </header>
        </>
    )
}

export default Header;