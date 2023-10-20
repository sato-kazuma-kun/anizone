"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import dashboard from './dashboard.module.css'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminDashboardAnimeUploadComponent from './anime-upload'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import AdminDashboardAmvUploadComponent from './amv-upload'
import Image from 'next/image'

export default function DashboardComponent() {
    const router = useRouter()
    const [userData, setUserData] = useState({})
    const [role, setRole] = useState({})
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        user_id: '',
        password: '',
        // Add other fields as needed
    })

    const redirectToPage = (url) => {
        window.location.href = url
    }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (!token) {
            toast.error("You haven't logged in, redirecting to login page.")
            redirectToPage('/login')
        } else {
            fetchUserData(token)
        }
    }, [])

    const fetchUserData = async (token) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_USER_DATA, {
                headers: {
                    Authorization: token,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch user data')
            }

            const data = await response.json()
            setUserData(data)
        } catch (error) {
            console.error('Error fetching user data:', error)
            toast.error('Something went wrong, please refresh the page!', ' Error: ', error)
        }
    }


    useEffect(() => {
        if (userData.role === process.env.NEXT_PUBLIC_ROLE_ADMIN && userData.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
            setRole({ role: "admin" });
        }
    }, [userData]);

    useEffect(() => {
        const addHonorific = (username) => {
            if (!username) {
                return ""; // Return an empty string if the username is undefined or empty
            }

            // Define the honorifics as regular expressions to capture them with surrounding spaces/symbols
            const definedHonorificsRegex = /(\s|-|_)*(くん|クン|さん|サン|ちゃん|チャン|どの|ドノ|様|サマ|さま|san|kun|chan|dono|sama)$/i;

            // Convert the username to lowercase to make it case-insensitive
            const lowercaseUsername = username.toLowerCase();

            // Remove spaces, underscores, hyphens, and other symbols from the username before the honorifics
            const cleanedUsername = lowercaseUsername.replace(definedHonorificsRegex, '');

            const japanesePattern = /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FFF]/;
            const hasJapaneseText = japanesePattern.test(cleanedUsername);

            const definedHonorifics = ["くん", "さん", "ちゃん", "どの", "様", "san", "kun", "chan", "dono", "sama"];

            let adminName = cleanedUsername;

            definedHonorifics.forEach((honorific) => {
                if (cleanedUsername.endsWith(honorific)) {
                    adminName = cleanedUsername.slice(0, -honorific.length);
                }
            });

            return `${adminName}${hasJapaneseText ? "-様" : "-sama"}`;
        };

        if (userData && userData.username) {
            toast.info(`Welcome, ${addHonorific(userData.username)}`);
        }
    }, [userData]);


    const handleLogout = () => {
        localStorage.removeItem('token')
        redirectToPage('/login')
    }

    const [isAnimeFormVisible, setIsAnimeFormVisible] = useState(false)
    const toggleAnimeFormVisibility = () => {
        setIsAnimeFormVisible((prevVisible) => !prevVisible)
    }

    const [isAmvFormVisible, setIsAmvFormVisible] = useState(false)
    const toggleAmvFormVisibility = () => {
        setIsAmvFormVisible((prevVisible) => !prevVisible)
    }

    const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false)
    const UpdateFormVisible = () => {
        setIsUpdateFormVisible((prevVisible) => !prevVisible)
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }))
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem('token')

        // Fetch the existing user data from the server
        const existingUserDataResponse = await fetch(process.env.NEXT_PUBLIC_USER_DATA, {
            headers: {
                Authorization: token,
            },
        })

        if (!existingUserDataResponse.ok) {
            console.error('Failed to fetch existing user data')
            toast.error('Failed to update user data')
            return
        }

        const existingUserData = await existingUserDataResponse.json()

        // Create a new FormData object to send both text data and the image file
        const formDataToSend = new FormData()

        // Update username if it's provided in the form and not empty
        if (formData.username && formData.username.trim() !== '') {
            formDataToSend.append('username', formData.username)
        } else {
            formDataToSend.append('username', existingUserData.username)
        }

        if (formData.user_id && formData.user_id.trim() !== '') {
            formDataToSend.append('user_id', formData.user_id)
        } else {
            formDataToSend.append('user_id', existingUserData.user_id)
        }

        // Update email if it's provided in the form and not empty
        if (formData.email && formData.email.trim() !== '') {
            formDataToSend.append('email', formData.email)
        } else {
            formDataToSend.append('email', existingUserData.email)
        }

        // Don't hash the password on the frontend, send the plain password to the backend
        formDataToSend.append('password', formData.password);

        // Add other fields you want to update
        if (formData.profilePic) {
            formDataToSend.append('profilePic', formData.profilePic) // Assuming formData.profilePic is the selected image file
        }

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_UPDATE_USER_DATA, {
                method: 'POST',
                headers: {
                    Authorization: token,
                },
                body: formDataToSend,
            })

            if (!response.ok) {
                throw new Error('Failed to update user data')
            }

            // Optionally, you can fetch the updated user data from the server after successful update
            // and update the local state with it.
            const updatedUserData = await response.json()
            setUserData(updatedUserData)

            toast.success('User data updated successfully')
        } catch (error) {
            console.error('Error updating user data:', error)
            toast.error('Something went wrong while updating user data')
        }
    }


    const [profilePicPreview, setProfilePicPreview] = useState(null)

    const handleProfilePicChange = (e) => {
        const file = e.target.files[0]
        setFormData((prevFormData) => ({
            ...prevFormData,
            profilePic: file,
        }))



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

    const [showPassword, setShowPassword] = useState(false)

    return (
        <>
            <section className={dashboard.wrapper}>

                <div className={dashboard.container}>

                    <div className={dashboard.profilePicContainer}>
                        <Image alt='profile' className={dashboard.profilePic} width={200} height={200} src={`${userData.profilePic}`} />
                    </div>

                    <div className={dashboard.dataContainer}>
                        <h2 className={dashboard.welcomeUser}>Welcome, {userData.username}</h2>

                        <span className={dashboard.userData}>
                            <h4 className={dashboard.userID}>User Id: {userData.user_id}</h4>
                            <h4 className={dashboard.userName}>User name: {userData.username}</h4>
                        </span>

                    </div>
                </div>

                <div className={dashboard.logoutBtnContainer}>
                    <button className={dashboard.logoutBtn} onClick={handleLogout}>Logout</button>
                </div>

                <h1 className={`mt-6 pt-5 text-2xl ${dashboard.admin}`}>Update your profile</h1>
                <button
                    className={`mb-4 ${dashboard.btn}`}
                    onClick={UpdateFormVisible}
                >
                    {isUpdateFormVisible ? 'Hide Form' : 'Show Form'}
                </button>
                {isUpdateFormVisible &&
                    <form className="w-full px-4 border rounded shadow-lg p-3" onSubmit={handleFormSubmit}>

                        <div className="my-4">
                            <label className="block font-bold mb-2">E-mail: (After changing email please re-login with your new email)</label>
                            <input autocomplete="new-email" className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="email" name="email" value={formData.email} onChange={handleFormChange} />
                        </div>


                        <div className="my-4">
                            <label className="block font-bold mb-2">Username:</label>
                            <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="username" value={formData.username} onChange={handleFormChange} />
                        </div>

                        <div className="my-4">
                            <label className="block font-bold mb-2">User ID:</label>
                            <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="user_id" value={formData.user_id} onChange={handleFormChange} />
                        </div>

                        <div className={`my-4 ${dashboard.input}`}>
                            <label className="block font-bold mb-2">Password:</label>
                            <input autocomplete="new-password" className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300`} type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleFormChange} />

                            <button
                                className={dashboard.revealBtn}
                                type="button"
                                onClick={() => setShowPassword((prevState) => !prevState)} // Toggle the password visibility state
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>

                        <div className="my-4">
                            <label className="block font-bold mb-2">Profile Picture:</label>
                            <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="file" accept="image/*" name="profilePic" onChange={handleProfilePicChange} />
                            {profilePicPreview && (
                                <div className={dashboard.preview}>
                                    <Image
                                        width={200} height={200}
                                        src={profilePicPreview}
                                        alt="Profile Preview"
                                        className={dashboard.profilePreview}
                                    />
                                </div>
                            )}
                        </div>

                        <button className={dashboard.btn} type="submit">Update</button>
                    </form>}

            </section>


            {/* Show the form only if the user is an admin */}
            {role.role === 'admin' && (
                <>
                    {/* Anime Upload Form Section */}
                    <section
                        id="forAdmin"
                        className={`w-1/2 ${dashboard.adminsDashboard}`}
                    >
                        <h1 className={`pt-5 text-2xl ${dashboard.admin}`}>Admin&#39;s Dashboard</h1>
                        <button
                            className={`mb-4 ${dashboard.btn}`}
                            onClick={toggleAnimeFormVisibility}
                        >
                            {isAnimeFormVisible ? 'Hide Anime Upload Form' : 'Show Anime Upload Form'}
                        </button>
                        {isAnimeFormVisible && <AdminDashboardAnimeUploadComponent />}
                    </section>

                    {/* AMV upload Form Section */}
                    <section
                        id='foradmin'
                        className={`w-1/2 ${dashboard.adminsDashboard}`}
                    >
                        <button
                            className={`mb-4 ${dashboard.btn}`}
                            onClick={toggleAmvFormVisibility}
                        >
                            {isAmvFormVisible ? 'Hide AMV Upload Form' : 'Show AMV Upload Form'}
                        </button>
                        {isAmvFormVisible && <AdminDashboardAmvUploadComponent />}
                    </section>
                </>
            )}

            <ToastContainer style={{ marginTop: '60px' }} />
        </>
    )
}

