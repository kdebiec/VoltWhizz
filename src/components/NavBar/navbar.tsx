import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import navbarModule from './navbar.module.css';
import componentsStyles from '@/styles/Components.module.css'

export interface NavbarProps {
}

export const Navbar: React.FC<NavbarProps> = ({}) => (
    <header className={navbarModule.header}>
        <div className={`${navbarModule.headerContainer} ${componentsStyles.container}`}>
            <Link className={navbarModule.headerLeft} href="/">VoltWhizz</Link>
            <ul className={navbarModule.headerMiddle}>
                <li><Link className={navbarModule.activeFont} href="/">Features</Link></li>
                <li><Link href="/roadmap">Roadmap</Link></li>
                <li><Link href="/Github">Github</Link></li>
            </ul>
            <div className={navbarModule.headerRight}>
                {/* <a className={`${styles.activeLang} ${styles.langSwitcher}`} href="/en">EN</a>
            <a className={styles.langSwitcher} href="/pl">PL</a> */}
            </div>
        </div>
    </header>
);