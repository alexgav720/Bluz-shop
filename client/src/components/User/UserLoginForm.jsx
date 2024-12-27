
import React, { useState } from 'react'

import styles from "../../styles/UserSignup.module.css"

import CLOSE from "../../Images/closeIcon.svg"
import { useDispatch } from 'react-redux'
import { loginUser, toggleForm, toggleFormType } from '../../features/user/userSlice'


const UserLoginForm = () => {

    const dispatch = useDispatch()
    const [values, setValues] = useState({
        identifier: "",
        password: "",
    })

    const handleChange = ({ target: { value, name } }) => {
        setValues({ ...values, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const isNotEmpty = Object.values(values).every(val => val);
        if (!isNotEmpty) return;

        dispatch(loginUser(values))
        dispatch(toggleForm(false))
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.close} onClick={() => { dispatch(toggleForm(false)) }}>
                <img src={CLOSE} alt="close" />
            </div>

            <div className={styles.title}>
                Log In
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.group}>
                    <input
                        type="email"
                        placeholder='Your email'
                        name='identifier'
                        value={values.identifier}
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

                <button type='submit' className={styles.submit}>
                    Login
                </button>
            </form>
            <div className={styles.link} onClick={()=>{dispatch(toggleFormType("signup"))}}>
                    Create an account
            </div>

        </div>

    )
}

export default UserLoginForm


