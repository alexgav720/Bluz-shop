import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../utils/routes'

import styles from "../../styles/Footer.module.css"

import LOGO from "../../Images/logo.svg"

const Footer = () => {
    return (
        <div>
            <section className={styles.footer}>
                <div className={styles.logo}>
                    <Link to={ROUTES.HOME}>
                        <img src={LOGO} alt='Bluz' className={styles.logo_img} />
                    </Link>
                </div>

                <div className={styles.creator}>
                    Developed by me ♥
                </div>

                <div className={styles.contacts}>
                    <p>телефон: 8-500-380-80-80</p>
                    <p>почта: pochta@mail.ru</p>
                    <p>адрес: пл. Пушкина д. 31</p>
                </div>

            </section>
        </div>
    )
}

export default Footer
