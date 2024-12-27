import React from 'react'

import styles from "../../styles/Poster.module.css"

import CAT from "../../Images/cat.png"
import { Link } from 'react-router-dom'

const Poster = () => {
    return (
        <section className={styles.home}>
            <div className={styles.title}> BIG SALE</div>
            <div className={styles.product}>
                <div className={styles.text}>
                    <div className={styles.subtitle}>the bestseller of 2024</div>
                    <h1 className={styles.head}>Most buttons in the world</h1>
                    <Link to="/categories/gktlw3lv7gzmhfdgodkd5wdu">
                        <button className={styles.button}>Shop now</button>
                    </Link>
                </div>
                <div className={styles.image}>
                    <img src={CAT} alt="product" />
                </div>
            </div>

        </section>
    )
}

export default Poster
