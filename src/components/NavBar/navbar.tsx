import React from 'react';
import { useRouter } from "next/router";
import navbarModule from './navbar.module.css';
import componentsStyles from '@/styles/Components.module.css'

export interface NavbarProps {
}

export const Navbar: React.FC<NavbarProps> = ({}) => (
    <header className={navbarModule.header}>
        <div className={`${navbarModule.headerContainer} ${componentsStyles.container}`}>
            <a className={navbarModule.headerLeft} href="/">VoltWhizz</a>
            <ul className={navbarModule.headerMiddle}>
                <li><a className={navbarModule.activeFont} href="/Features">Features</a></li>
                <li><a href="/roadmap">Roadmap</a></li>
                <li><a href="/Github">Github</a></li>
            </ul>
            <div className={navbarModule.headerRight}>
                {/* <a className={`${styles.activeLang} ${styles.langSwitcher}`} href="/en">EN</a>
            <a className={styles.langSwitcher} href="/pl">PL</a> */}
            </div>
        </div>
    </header>
);