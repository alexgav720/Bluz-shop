import React from 'react'

import styles from "../../styles/Products.module.css"
// import AVATAR from "../../Images/avatar.jpg"
import { Link } from "react-router-dom"
import { BASAE_IMG_URL } from '../../utils/constants'

const Products = ({ title, products = [], amount }) => {
    // console.log(products)
    const list = products.filter((_, i) => i < amount)
    return (
        <section className={styles.products}>
            {title && <h2 className={styles.head}>{title}</h2>}
            <div className={styles.list}>

                {list.map(({ documentId, images, title, category: { name: cat }, price }) => (
                    <Link to={`/products/${documentId}`} key={documentId} className={styles.product}>
                        <div className={styles.image} style={{ backgroundImage: `url(${BASAE_IMG_URL + images[0].url})` }}></div>
                        <div className={styles.wrapper}>
                            <h3 className={styles.title}>{title}</h3>
                            <div className={styles.cat}>{cat}</div>
                            <div className={styles.info}>
                                <div className={styles.prices}>
                                    <div className={styles.price}>{price}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    )
}

export default Products
