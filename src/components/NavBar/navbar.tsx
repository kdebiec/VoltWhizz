import React from 'react';
import Link from "next/link";
import { useRouter } from "next/router";
import navbarModule from './navbar.module.css';
import componentsStyles from '@/styles/Components.module.css'
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/button/button";

export interface NavbarProps {
}

export function Navbar() {
    const router = useRouter()
    const session = useSession();

    return (
        <header className={navbarModule.header}>
            <div className={`${navbarModule.headerContainer} ${componentsStyles.container}`}>
                <Link className={navbarModule.headerLeft} href="/">VoltWhizz</Link>
                <ul className={navbarModule.headerMiddle}>
                    <li><Link href="/" className={router.asPath === "/" ? navbarModule.activeFont : undefined}>Features</Link></li>
                    <li><Link href="/roadmap" className={router.asPath === "/roadmap" ? navbarModule.activeFont : undefined}>Roadmap</Link></li>
                    <li><a href="https://github.com/kdebiec/VoltWhizz">Github</a></li>
                </ul>
                <div className={navbarModule.headerRight}>
                    {session.status == "authenticated" ? (
                        <Button onClick={() => signOut()}>
                            Logout
                        </Button>
                        // <button className={navbarModule.logoutButton} onClick={() => signOut()}>Logout</button>
                    ) : null
                    }
                    {/* <Link href="/login">Login</Link>
                <Link href="/signup">Signup</Link> */}
                    {/* <a className={`${styles.activeLang} ${styles.langSwitcher}`} href="/en">EN</a>
            <a className={styles.langSwitcher} href="/pl">PL</a> */}
                </div>
            </div>
        </header>
    );
};