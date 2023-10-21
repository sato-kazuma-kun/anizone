"use client"

import { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './login.module.css'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from 'next/link'

export default function LoginComponent() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirectToPage = (url) => {
        window.location.href = url
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            redirectToPage('/dashboard')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:3300/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem('token', data.token)
            redirectToPage('/dashboard')
        } else {
            toast.error(data.message) // Handle login errors here
        }
    }

    const [showPassword, setShowPassword] = useState(false)

    return (
        <section className={styles.wrapper}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.email}>
                    <label className={styles.lable}>Email:</label>
                    <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className={styles.pass}>
                    <label className={styles.lable}>Password:</label>
                    {/* <input className={styles.input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}

                    <div className={styles.passInput}>
                        <input
                            className={styles.input}
                            type={showPassword ? 'text' : 'password'} // Toggle password visibility
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className={styles.revealBtn}
                            type="button"
                            onClick={() => setShowPassword((prevState) => !prevState)} // Toggle the password visibility state
                        >
                            <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                        </button>
                    </div>

                </div>

                <div className={styles.submit}>
                    <button type="submit" className={styles.btn}>Login</button>
                </div>

                <div className={styles.ifNot}>
                    <p className={styles.ifNotP}>Dont have an account</p>

                    <Link href='/signup'>
                        <button className={`${styles.btn} ${styles.ifNotBtn}`}>Sign in</button>
                    </Link>
                </div>
            </form>

            <ToastContainer style={{ marginTop: '60px' }} />
        </section>

    )
}

