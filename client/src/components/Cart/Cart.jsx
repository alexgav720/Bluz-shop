import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import styles from "../../styles/Cart.module.css"
import { sumBy } from '../../utils/common'

import PLUS from "../../Images/plus.svg"
import MINUS from "../../Images/minus.svg"
import CLOSE from "../../Images/close.svg"
import { addItemToCart, removeItemFromCart } from '../../features/user/userSlice'
import { BASAE_IMG_URL } from '../../utils/constants'

const Cart = () => {

    const { cart } = useSelector(({ user }) => user)
    const dispatch = useDispatch()

    const changeQuantity = (item, quantity) => {
        dispatch(addItemToCart({ ...item, quantity }))
    }

    const removeItem = (id) => {
        dispatch(removeItemFromCart(id))
    }

    return (
        <section className={styles.cart}>
            <h2 className={styles.title}>Your cart</h2>
            {!cart.length ? (
                <div className={styles.empty}>Here is empty</div>
            ) : (
                <>
                    <div className={styles.list}>
                        {
                        !cart? <></>:
                        cart.map((item) => {
                            const { title, category, images, price, id, quantity } = item;
                            return <div className={styles.item} key={id}>
                                <div
                                    className={styles.image}
                                    style={{ backgroundImage: `url(${BASAE_IMG_URL + images[0].url})` }}
                                />
                                <div className={styles.info}>
                                    <h3 className={styles.name}>{title}</h3>
                                    <div className={styles.category}>{category.name}</div>
                                </div>

                                <div className={styles.price}>{price}₽</div>

                                <div className={styles.quantity}>
                                    <div className={styles.minus} onClick={() => changeQuantity(item, Math.max(1, quantity - 1))}>
                                        <img className={styles.icon} src={MINUS} alt="minus" />
                                    </div>
                                    {quantity}
                                    <div className={styles.plus} onClick={() => changeQuantity(item, Math.max(1, quantity + 1))}>
                                        <img className={styles.icon} src={PLUS} alt="plus" />
                                    </div>
                                </div>

                                <div className={styles.total}>{price * quantity}₽</div>

                                <div className={styles.close} onClick={() => removeItem(item.id)}>
                                    <img className={styles.icon} src={CLOSE} alt="remove" />
                                </div>
                            </div>
                        })}
                    </div>
                    <div className={styles.actions}>
                        <div className={styles.total}>
                            TOTAL PRICE: {" "}
                            <span>
                                {sumBy(cart.map(({ quantity, price }) => quantity * price))}₽
                            </span>
                        </div>
                        <button className={styles.proceed}>proceed to checkout</button>

                    </div>
                </>
            )}
        </section>
    )
}

export default Cart
