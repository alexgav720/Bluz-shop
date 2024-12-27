import React from 'react'
import UserSignupForm from './UserSignupForm'
import { useDispatch, useSelector } from 'react-redux'

import styles from "../../styles/UserForm.module.css"
import { toggleForm } from '../../features/user/userSlice'
import UserLoginForm from './UserLoginForm'


const UserForm = () => {
    const dispatch = useDispatch()
    const { showForm, formType } = useSelector(({ user }) => user)
    return (
        showForm ?
            <>
                <div className={styles.overlay} onClick={() => { dispatch(toggleForm(false)) }} />
                {formType === "signup" ? <UserSignupForm /> : <UserLoginForm />}

            </>
            :
            <></>
    )
}

export default UserForm
