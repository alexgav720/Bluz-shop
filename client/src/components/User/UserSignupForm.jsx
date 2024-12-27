import React, { useState } from 'react'

import styles from "../../styles/UserSignup.module.css"

import CLOSE from "../../Images/closeIcon.svg"
import { useDispatch } from 'react-redux'
import { createUser, toggleForm, toggleFormType } from '../../features/user/userSlice'

const UserSignupForm = () => {
    const dispatch = useDispatch()
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        // avatar: "",
    })

    const handleChange = ({ target: { value, name } }) => {
        // console.log(value)
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).every(val => val);
        if (!isNotEmpty) return;

        dispatch(createUser(values))
        dispatch(toggleForm(false))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={() => { dispatch(toggleForm(false)) }}>
                <img src={CLOSE} alt="close" />
            </div>

            <div className={styles.title}>
                Register
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input
                        type="email"
                        placeholder='Your email'
                        name='email'
                        value={values.email}
                        autoComplete='off'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.group}>
                    <input
                        type="name"
                        placeholder='Your name'
                        name='username'
                        value={values.username}
                        autoComplete='off'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.group}>
                    <input
                        type="password"
                        placeholder='Your password'
                        name='password'
                        value={values.password}
                        autoComplete='off'
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* <div className={styles.group}>
                    <input
                        type="file"
                        accept='image'
                        placeholder='Your avatar'
                        name='avatar'
                        // value={values.avatar}
                        autoComplete='off'
                        // onChange={handleChange}
                        // required
                    />
                </div> */}


                <button type='submit' className={styles.submit}>
                    Create an account
                </button>
            </form>
            <div className={styles.link} onClick={()=>{dispatch(toggleFormType("login"))}}>
                    I already have an account
            </div>

        </div>

    )
}

export default UserSignupForm
