'use client'

import Link from 'next/link'
import menu from './menu.module.css'
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter, usePathname } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import React from 'react'
import Image from 'next/image'
import { Tooltip } from 'react-tooltip'

let isR18PlusChecked = 'unchecked';

export function updateIsR18PlusCheckedInMenu(newState) {
    isR18PlusChecked = newState
    // Update the local storage or perform other actions as needed
    if (typeof localStorage !== 'undefined') {
        localStorage.setItem('ShowR18+', newState);
    }
};

const MenuComponent = React.forwardRef((props, ref) => {
    const router = useRouter()
    const pathname = usePathname()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const asideRef = useRef(null)
    const hamburgerCheckboxRef = useRef(null)

    useEffect(() => {
        const mainElement = document.querySelector("main")
        const htmlElement = document.querySelector("html")

        if (isMenuOpen) {
            mainElement.classList.add("main-with-filter")
            htmlElement.classList.add("html-with-filter")
        } else if (mainElement && !isMenuOpen) {
            mainElement.classList.remove("main-with-filter")
            htmlElement.classList.remove("html-with-filter")
        }

        const notActive = "navItems"
        const notActiveElements = document.querySelectorAll(`.${menu[notActive]}`)

        const handleLinkClick = () => {
            setIsMenuOpen(false)
        }

        if (notActiveElements.length > 0) {
            notActiveElements.forEach((element) => {
                element.addEventListener("click", handleLinkClick)
            })
        }

        const handleDocumentClick = (event) => {
            if (
                !asideRef.current.contains(event.target) &&
                !hamburgerCheckboxRef.current.contains(event.target)
            ) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener("click", handleDocumentClick)

        return () => {
            if (notActiveElements.length > 0) {
                notActiveElements.forEach((element) => {
                    element.removeEventListener("click", handleLinkClick)
                })
            }

            document.removeEventListener("click", handleDocumentClick)
        }
    }, [isMenuOpen])


    const [userData, setUserData] = useState({})
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            fetchUserData(token)
        }
    }, [])

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('http://localhost:3300/api/user', {
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
        }
    }
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if it's a mobile device and set the state accordingly
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    }, []);

    // const [isR18PlusCheckedd, setIsR18PlusCheckedd] = useState('unchecked');

    // useEffect(() => {
    //     const showR18Plus = checkLocalStorage('ShowR18+', 'unchecked');
    //     setIsR18PlusCheckedd(showR18Plus);
    // }, []);

    useEffect(() => {
        const showR18Plus = localStorage.getItem('ShowR18+') || 'unchecked';
        isR18PlusChecked = showR18Plus
    }, []);

    return (
        <header className={menu.header} id='header'>
            <label ref={hamburgerCheckboxRef} className={menu.hamburgerMenu} data-tooltip-id="menu-tooltip" data-tooltip-content="Menu" id='menu'>
                <input
                    ref={hamburgerCheckboxRef}
                    className={menu.input}
                    type="checkbox"
                    id="hamburger-checkbox"
                    checked={isMenuOpen}
                    onChange={(e) => setIsMenuOpen(e.target.checked)}
                />
            </label>
            <aside ref={asideRef} className={menu.sidebar}>
                <nav ref={ref} className={menu.navList}>
                    <Link href="/" className={menu.navItems} id={pathname === '/' ? 'active' : 'notActive'}>
                        <div>Home</div>
                    </Link>

                    <Link href="/browse-anime" className={menu.navItems} id={pathname === '/browse-anime' ? 'active' : 'notActive'}>
                        <div>Browse Anime</div>
                    </Link>

                    {isR18PlusChecked === 'checked' && (
                        <Link href="/view/hentai" className={menu.navItems} id={pathname === '/view/hentai' ? 'active' : 'notActive'}>
                            <div>Browse Hentai</div>
                        </Link>
                    )}

                    <Link href="/search" className={menu.navItems} id={pathname === '/search' ? 'active' : 'notActive'}>
                        <div>Search</div>
                    </Link>

                    <Link href="/recently-updated" className={menu.navItems} id={pathname === '/recently-updated' ? 'active' : 'notActive'}>
                        <div>Recently Updated</div>
                    </Link>

                    <Link href="/seasonal-anime" className={menu.navItems} id={pathname === '/seasonal-anime' ? 'active' : 'notActive'}>
                        <div>Seasonal Anime</div>
                    </Link>

                    <Link href="/view/amv" className={menu.navItems} id={pathname === '/amv' ? 'active' : 'notActive'}>
                        <div>AMVs</div>
                    </Link>

                    {userData.profilePic ? (
                        <Link href="/dashboard" className={menu.navItems} id={pathname === '/dashboard' ? 'active' : 'notActive'}>
                            <div>{userData.username}&#39;s dashboard</div>
                        </Link>
                    ) : (
                        <Link href="/signup" className={menu.navItems} id={pathname === '/signup' ? 'active' : 'notActive'}>
                            <div>Sign up</div>
                        </Link>
                    )}

                    <Link href="/library" className={menu.navItems} id={pathname === '/library' ? 'active' : 'notActive'}>
                        <div>Library</div>
                    </Link>

                    <Link href="/settings" className={menu.navItems} id={pathname === '/settings' ? 'active' : 'notActive'}>
                        <div>Settings</div>
                    </Link>

                    <Link href="/settings/about" className={menu.navItems} id={pathname === '/about' ? 'active' : 'notActive'}>
                        <div>About</div>
                    </Link>
                </nav>
            </aside>
            <div className={menu.headerElements}>
                <div className={menu.headerLeft}>
                    <Image
                        width={75}
                        height={25}
                        className={menu.logo}
                        alt="Aniflex"
                        data-tooltip-id="menu-tooltip" data-tooltip-content="Aniflex home"
                        loading="lazy"
                        src="/assets/images/Picsart_23-05-07_11-15-05-019.png"
                        onClick={() => router.push('/')} />
                </div>

                <div className={menu.headerRight}>
                    <FontAwesomeIcon data-tooltip-id="menu-tooltip" data-tooltip-content="Search" className={menu.search} icon={faSearch} onClick={() => router.push('/search')} />

                    {userData.profilePic ? (
                        <Link href="/dashboard" className={menu.profilePicContainer}>
                            <Image width={32} height={32} data-tooltip-id="menu-tooltip" data-tooltip-content={userData.username} src={`http://localhost:3300/${userData.profilePic}`} alt={userData.username} className={menu.profilePic} />
                        </Link>
                    ) : (
                        <Link href="/signup" className={menu.profilePicContainer}>
                            <Image width={32} height={32} data-tooltip-id="menu-tooltip" data-tooltip-content='Sign in' src='/assets/images/default.png' alt='profile' className={menu.profilePic} />
                        </Link>
                    )}
                </div>
            </div>
            {!isMobile ? (
                <Tooltip style={{ zIndex: '999999999999' }} id="menu-tooltip" />
            ) : null}
        </header>
    )
})



MenuComponent.displayName = 'MenuComponent'
export default MenuComponent
