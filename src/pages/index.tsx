import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import componentsStyles from '@/styles/Components.module.css'

import { Navbar } from '@/components/NavBar/navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
    <Navbar />
      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={`${styles.heroContainer} ${componentsStyles.container}`}>
            <h1 className={styles.heroTitle}>VoltWhizz</h1>
            <div className={styles.heroSubtitleContainer}>
              <p>Find the best deals on electricity. It's free. It's open source.</p>
            </div>
          </div>
        </section>
        <section className={`${styles.featureSection} ${styles.featureSectionGrey}`}>
          <div className={`${styles.featureContainer} ${componentsStyles.container}`}>
            <div className={styles.featureContainerInner}>
              <div className={`${styles.featureContainerImageColumn} ${styles.featureContainerLeftColumn}`}>
                <div className={styles.featureContainerImage}>
                  <Image
                    src="/images/DrawKit.svg"
                    alt="Picture of the author"
                    layout="responsive"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className={styles.featureContainerRightColumn}>
                <h2 className={styles.featureContainerRightColumnTitle}>Reduce Bills</h2>
                <div className={styles.featureContainerRightColumnDesc}>
                  <p>Slash Your Energy Expenses: Unlock Smart Savings for a Greener Wallet and Planet</p>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.featureSection}>
          <div className={`${styles.featureContainer} ${componentsStyles.container}`}>
            <div className={styles.featureContainerInner}>
              <div className={styles.featureContainerLeftColumn}>
                <div>
                  <h2 className={styles.featureContainerRightColumnTitle}>Manage Payments</h2>
                  <div className={styles.featureContainerRightColumnDesc}>
                    <p>Organize and Track Payments: Easy-to-Use Tools for Efficient Energy Bill Management</p>
                  </div>
                  <div></div>
                </div>
              </div>
              <div className={styles.featureContainerImageColumn}>
                <div className={styles.featureContainerImage}>
                  <Image
                    src="/images/DrawKit_2.svg"
                    alt="Picture of the author"
                    layout="responsive"
                    width={300}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={`${styles.footerContainer} ${componentsStyles.container}`}>
            <span className={styles.footerText}>Created by Konrad Dębiec</span>
          </div>
        </footer>
      </main>
    </>
  )
}
