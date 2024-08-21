import Link from 'next/link'
import styles from './Footer.module.scss'

export const Footer = () => {
    return (
        <div className={styles.footerContainer}>
            <Link href="https://matiasnmolina.com" target='_blank' className={styles.name} >
                Matias Molina
            </Link>
            <span>
                | Frontend Developer
            </span>
        </div>
    )
}
