import React from 'react'

import styles from "../../styles/Categories.module.css"
import { Link } from 'react-router-dom'
import { BASAE_IMG_URL } from '../../utils/constants'

const Categories = ({ title, products = [], amount }) => {

    const list = products.filter((_, i) => i < amount)
    return (
        <section className={styles.section}>
            <h2>{title}</h2>
            <div className={styles.list}>
                {
                    list.map(({ documentId, name, image }) => (
                        <Link to={`/categories/${documentId}`} key={documentId} className={styles.item}>
                            <div className={styles.image} style={{backgroundImage:`url(${BASAE_IMG_URL+image.url})`}}/>
                            <h3 className={styles.title}>{name}</h3>
                        </Link>
                    ))
                }
            </div>
        </section>
    )
}

export default Categories
