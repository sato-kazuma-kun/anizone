"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './signup.module.css'
import Link from 'next/link'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from 'next/image'

export default function SignUpComponent() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [userId, setUserId] = useState('') // State for user id
    const [username, setUsername] = useState('') // State for username
    const [profilePic, setProfilePic] = useState(null) // State for profile picture


    /* STARTS 1/4: VERIFY OTP */

    // const [otp, setOTP] = useState('')
    // const [otpSent, setOtpSent] = useState(false)

    // const handleSendOTP = async () => {
    //     try {
    //         await fetch('http://localhost:3300/api/verification', {
    //             method: 'POST',
    //             body: JSON.stringify({ email }),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         })
    //         setOtpSent(true)
    //     } catch (error) {
    //         toast.error('Failed to send OTP. Please try again later.')
    //     }
    // }

    // const verifyOTP = async () => {
    //     try {
    //         const response = await fetch('http://localhost:3300/api/verification', {
    //             method: 'POST',
    //             body: JSON.stringify({ email, otp }),
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         if (response.ok) {
    //             // If the OTP is verified successfully, proceed with form submission
    //             const otpSent = 
    //         } else {
    //             toast.error('Invalid OTP. Please enter the correct OTP.');
    //         }
    //     } catch (error) {
    //         toast.error('Error verifying OTP:', error);
    //     }
    // };

    /* ENDS 1/4: VERIFY OTP */

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

        // Check if the botField has a value (meaning it was filled by a bot)
        const botFieldValue = e.target.botField.value
        if (botFieldValue) {
            toast.error('You might be a bot, complete the varification process!')
            return
        }

        /* STARTS 2/4: VERIFY OTP */

        // if (otpSent) {
        //     const isOTPValid = verifyOTP(email, otp)

        //     if (!isOTPValid) {
        //         toast.error('Invalid OTP. Please enter the correct OTP.')
        //         return
        //     }
        // }

        /* Ends 2/4: VERIFY OTP */

        const formData = new FormData()
        formData.append('email', email)
        formData.append('password', password)
        formData.append('user_id', userId) // Append user id to the form data
        formData.append('username', username) // Append username to the form data
        formData.append('profilePic', profilePic) // Append profile picture to the form data

        try {
            const response = await fetch('http://localhost:3300/api/register', {
                method: 'POST',
                body: formData,
            })

            const data = await response.json()

            if (response.ok) {
                toast.success('Signup successful! Redirecting to login page...')

                redirectToPage('/login') // Redirect to login page after successful signup
            } else {
                toast.error(data.message) // Handle signup errors here
            }
        } catch (error) {
            toast.error('Error during signup:', error)
        }

        /* STARTS 3/4: VERIFY OTP */

        // Reset otpSent state to false after verifying OTP and submitting the form
        // setOtpSent(false);

        /* Ends 3/4: VERIFY OTP */


    }
    const [showPassword, setShowPassword] = useState(false)
    const [profilePicFile, setProfilePicFile] = useState(null)
    const [profilePicPreview, setProfilePicPreview] = useState(null)

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        setProfilePic(file)

        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfilePicPreview(reader.result)
            }
            reader.readAsDataURL(file)
        } else {
            setProfilePicPreview(null)
        }
    }

    return (
        <section>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.email}>
                    <label className={styles.label}>Email:</label>
                    <input
                        className={styles.input}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={styles.email}>
                    <label className={styles.label}>Password:</label>
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

                <div className={styles.email}>
                    <label className={styles.label}>User ID:</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />
                </div>

                <div className={styles.email}>
                    <label className={styles.label}>Username:</label>
                    <input
                        className={styles.input}
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div style={{ position: 'absolute', left: '-9999px' }}>
                    <input
                        type="text"
                        name="botField"
                        value=""
                        autoComplete="off"
                        tabIndex="-1"
                        style={{ position: 'absolute', left: '-9999px' }}
                    />
                </div>


                <div className={styles.email}>
                    <label className={styles.label}>Profile Picture:</label>
                    <input
                        name="profilePic"
                        className={styles.input}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    {profilePicPreview && (
                        <div className={styles.preview}>
                            <Image
                                width={100}
                                height={100}
                                src={profilePicPreview}
                                alt="Profile Preview"
                                className={styles.profilePreview}
                            />
                        </div>
                    )}
                </div>


                {/* STARTS 4/4: OTP VARIFICATION */}

                {/* {otpSent ? (
                        <div className={styles.otpInput}>
                            <label className={styles.label}>Enter OTP:</label>
                            <input
                                className={styles.input}
                                type="text"
                                value={otp}
                                onChange={(e) => setOTP(e.target.value)}
                            />
                        </div>
                    ) : (
                        <button type="button" onClick={handleSendOTP}>
                            Send OTP
                        </button>
                    )} */}

                {/* Ends 4/4: OTP VARIFICATION */}


                <div className={styles.submit}>
                    <button type="submit" className={styles.btn}>Signup</button>
                </div>

                <div className={styles.ifNot}>
                    <p className={styles.ifNotP}>Already have an account,</p>
                    <Link href="/login">
                        <button className={`${styles.btn} ${styles.ifNotBtn}`}>Login</button>
                    </Link>
                </div>
            </form>


            <ToastContainer style={{ marginTop: '60px' }} />
        </section>
    )
}

