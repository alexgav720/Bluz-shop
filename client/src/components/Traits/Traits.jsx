import React from 'react'

import DILIVERY from "../../Images/dilivery.svg"
import CART from "../../Images/cart.svg"
import CALENDAR from "../../Images/calendar.svg"
import PRICES from "../../Images/prices.svg"

import styles from "../../styles/Traits.module.css"

const Traits = () => {
    return (
        <section className={styles.section}>
            <h2>Our traits</h2>
            <div className={styles.list}>
                <div className={styles.item}>
                    <div className={styles.image} style={{ backgroundImage: `url(${DILIVERY})` }} />
                    <h3 className={styles.title}>Удобная доставка</h3>
                    <div className={styles.subtitle}>Доставляем любыми службами доставки</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image} style={{ backgroundImage: `url(${CART})` }} />
                    <h3 className={styles.title}>Доступность каждому</h3>
                    <div className={styles.subtitle}>Минимальный заказ - 1000 рублей</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image} style={{ backgroundImage: `url(${CALENDAR})` }} />
                    <h3 className={styles.title}>Отличный сервис</h3>
                    <div className={styles.subtitle}>Работаем 7 дней в неделю</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.image} style={{ backgroundImage: `url(${PRICES})` }} />
                    <h3 className={styles.title}>Разумные цены</h3>
                    <div className={styles.subtitle}>Система скидок и цены ниже розничных</div>
                </div>
            </div>
        </section >
    )
}

export default Traits
