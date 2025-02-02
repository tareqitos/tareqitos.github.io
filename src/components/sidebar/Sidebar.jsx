import { useEffect, useRef } from "react"
import { AtSymbolIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router";

import ToTop from "../toTop";
import styles from './Sidebar.module.scss';
import links_styles from '../links/Links.module.scss';
import components_styles from '../../styles/Components.module.scss'
import { useLocation } from "react-router";


function Sidebar({ categories, sidebarActive, setSidebarActive, activeCategory, setActiveCategory, theme, toggleTheme }) {

    const location = useLocation();

    useEffect(() => {
        setSidebarActive(false)
        function sidebarCloseOnResize() {
            if (window.innerWidth > 1200) {
                document.documentElement.classList.remove('stop-scrolling')
                setSidebarActive(false);
            }
        }

        window.addEventListener('resize', sidebarCloseOnResize);

        return () => {
            window.removeEventListener('resize', sidebarCloseOnResize);
        }
    }, [])

    useEffect(() => {
        const html = document.documentElement;
        sidebarActive ? html.classList.add('stop-scrolling') : html.classList.remove('stop-scrolling')
    }, [sidebarActive])

    const observer = useRef(null);

    useEffect(() => {
        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveCategory(entry.target.id);
                }
            });
        };

        const options = {
            root: null, // Use the viewport
            rootMargin: '0px 0px -75% 0px', // Offset to trigger earlier
            threshold: 0.6, // Trigger when 60% of the element is visible
        };

        observer.current = new IntersectionObserver(handleIntersect, options);
        const elements = document.querySelectorAll(`.${links_styles['anchor']}`);

        elements.forEach((element) => observer.current.observe(element));

        return () => {
            elements.forEach((element) => observer.current.unobserve(element));
        };
    }, [setActiveCategory]);

    return (
        <aside className={`${styles['sidebar-main']} ${sidebarActive ? styles.active : ''}`} style={{ visibility: sidebarActive ? 'visible' : '' }}>
            <nav className={styles.navbar}>
                <button onClick={() => setSidebarActive(false)} className={`${styles['sidebar-btn']} ${styles.close}`}><i className="fa-solid fa-xmark"></i></button>
                <ul className={styles['navbar-list']}>
                    {categories.map((category) => (
                        <li key={category} className={`${styles['navbar-item']} ${`navbar-${category}`}`}>
                            <a onClick={() => sidebarActive ? setSidebarActive(false) : sidebarActive} href={`#${location.pathname}#${category.replace(/\s+/g, '_')}_id`} className={activeCategory == `${category.replace(/\s+/g, '_')}_id` ? styles.active : ''}><span></span>
                                {category == 'beginner' ? category.charAt(0).toUpperCase() + category.slice(1) + ' essentials' : category.charAt(0).toUpperCase() + category.slice(1)}</a>
                        </li>
                    ))}
                </ul>
                <hr />

                <ToTop button_css_selector={styles['to-top-sidebar']} />
                <NavLink className={`${components_styles.btn} ${styles['page-links']}`} to='/resources'>Study Resources</NavLink>
                <NavLink className={`${components_styles.btn} ${styles['page-links']}`} to='/media'>Media Library</NavLink>
                <NavLink className={`${components_styles.btn} ${styles['page-links']}`} to='/applications'>Applications</NavLink>
            </nav>
            <div className={` ${styles['sidebar-external-links']}`}>
                <div className={`${components_styles.socials} ${styles['socials-sidebar']}`}>
                    <button onClick={() => toggleTheme()} className={`${styles['theme-toggle-sidebar']} ${components_styles.btn}`}>{theme == 'dark' ? <MoonIcon className={components_styles['h-icon']} /> : <SunIcon className={components_styles['h-icon']} />}</button>

                    <a href="https://github.com/tareqitos/yamedame.github.io" target="_blank"><i
                        className="fa-brands fa-github"></i></a>
                    <a href="mailto:contact@yameda.me"><AtSymbolIcon className={components_styles['h-icon']} /></a>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;