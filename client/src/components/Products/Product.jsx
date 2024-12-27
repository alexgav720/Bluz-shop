import React, { useEffect, useState } from 'react'

import styles from "../../styles/Product.module.css"
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/routes';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../features/user/userSlice';
import { BASAE_IMG_URL } from '../../utils/constants';


const Product = (item) => {
    const { images, title, price, description } = item.data
    const dispatch = useDispatch();

    const [currentImage, setCurrentImage] = useState();

    useEffect(() => {
        if (!images.length) return
        setCurrentImage(BASAE_IMG_URL + images[0].url)
    }, [images])

    const addToCart = () => {
        dispatch(addItemToCart(item.data))
    }

    return (
        <section className={styles.product}>
            <div className={styles.images}>
                <div
                    className={styles.current}
                    style={{ backgroundImage: `url(${currentImage})` }}
                />
                <div className={styles.imagesList}>
                    {images.map((image, i) => (
                        <div
                            key={i}
                            className={styles.image}
                            style={{ backgroundImage: `url(${BASAE_IMG_URL + image.url})` }}
                            onClick={() => { setCurrentImage(BASAE_IMG_URL + image.url) }}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.info}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.price}>{price}</div>
                <p className={styles.description}>{description}</p>

                <div className={styles.actions}>
                    <button
                        className={styles.add}
                        onClick={addToCart}
                    >Add to cart</button>
                    {/* <button className={styles.favorite}>Favoriet</button> */}

                    <div className={styles.bottom}>
                        <Link to={ROUTES.HOME}>Bluz</Link>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Product
