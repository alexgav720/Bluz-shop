import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Link } from 'react-router-dom'

import styles from "../../styles/Header.module.css"

import { ROUTES } from '../../utils/routes'

import LOGO from "../../Images/logo.svg"
import AVATAR from "../../Images/avatar.jpg"
import SPRITE from "../../Images/sprite.svg"
// import FAVORITE from "../../Images/icon-fav.svg"
import SHOPS from "../../Images/shops.svg"
import { toggleForm } from '../../features/user/userSlice'
import { useGetProductsQuery } from '../../features/api/apiSlice'
import { BASAE_IMG_URL } from '../../utils/constants'

const Header = () => {
    const dispatch = useDispatch()

    const [searchValue, setSearcValue] = useState("")
    const { currentUser, cart } = useSelector(({ user }) => user)

    const handleClick = () => {
        if (!currentUser) {
            dispatch(toggleForm(true))
        }
    }

    const handleSearch = ({ target: { value } }) => {
        setSearcValue(value)
    }

    const [values, setValues] = useState({ username: "Guest", avatar: AVATAR });

    const { data, isloading } = useGetProductsQuery(`?populate=*&filters[title][$containsi]=${searchValue}`);
    // const { data, isloading } = useGetProductsQuery({ title: searchValue });

    useEffect(() => {
        if (!currentUser) return;
        setValues(currentUser)
    }, [currentUser])

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={ROUTES.HOME}>
                    <img src={LOGO} alt='Bluz' className={styles.logo_img} />
                </Link>
            </div>

            <div className={styles.info}>
                <div className={styles.user} onClick={handleClick}>
                    <div className={styles.avatar} style={{
                        backgroundImage: `url(${values.avatar})`,
                        width: "80px",
                        height: "80px",
                        backgroundSize: "cover",
                        borderRadius: "100px"
                    }} />
                    <div className={styles.username}>{values.username}</div>
                </div>
            </div>

            <form className={styles.form}>
                <div className={styles.icon}>
                    <img src={SPRITE} alt="find" />
                </div>
                <div className={styles.input}>
                    <input
                        type='search'
                        name='search'
                        placeholder='Search...'
                        autoComplete='off'
                        onChange={handleSearch}
                        value={searchValue} />
                </div>

                {searchValue && <div className={styles.box}>
                    {isloading ? "loading" : !data ? "No results" : (
                        data.data.map(({ title, images, documentId }) => {
                            return (
                                <Link
                                    key={documentId}
                                    onClick={() => setSearcValue("")}
                                    className={styles.item}
                                    to={`/products/${documentId}`}
                                >
                                    <div className={styles.image}
                                        style={{ backgroundImage: `url(${BASAE_IMG_URL + images[0].url})` }}
                                    />
                                    <div className={styles.title}>{title}</div>
                                </Link>
                            )
                        })
                    )}
                </div>}
            </form>

            <div className={styles.account}>
                {/* favourite icon */}
                {/* <Link to={ROUTES.HOME} className={styles.favorites}>
                    <img src={FAVORITE} alt="favorite" />
                </Link> */}

                <Link to={ROUTES.CART} className={styles.cart}>
                    <img src={SHOPS} alt="cart" />
                    {cart.length !== 0 && <span className={styles.count}>{cart.length}</span>}

                </Link>
            </div>

        </div>
    )
}

export default Header
