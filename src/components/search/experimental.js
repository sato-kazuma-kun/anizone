'use client'

import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './search.module.css'
import { Tooltip } from 'react-tooltip'
import { animeDataAPI } from '@/api/api'
import Image from 'next/image'
// import { useSearchParams } from 'next/navigation'
import { useSearchParams } from 'react-router-dom'

const ExperimentalSearch = () => {
    // const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [searchPerformed, setSearchPerformed] = useState(false) // Track if a search has been performed

    const [searchTerm, setSearchTerm] = useSearchParams({ searchTermParam: "" })
    const searchTermParam = searchParam.get("searchTermParam")

    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            toast.info('Please enter a search term.');
            return;
        }

        try {
            const data = await animeDataAPI()

            const searchTermsArray = searchTerm.trim().split(/\s+/); // Split search terms based on spaces

            // Create an array of Fuse instances with different keys
            const fuseInstances = ['tag', 'title', 'japanese', 'genre', 'studios', 'synonyms'].map((key) =>
                new Fuse(data, {
                    keys: [key],
                    includeScore: true,
                    threshold: 0.3,
                })
            );

            // Perform search on each Fuse instance and merge results
            let mergedSearchResults = [];
            for (const fuse of fuseInstances) {
                for (const term of searchTermsArray) {
                    const currentResults = fuse.search(term);
                    mergedSearchResults = [...mergedSearchResults, ...currentResults];
                }
            }

            // Sort search results by score (lower score means better match)
            mergedSearchResults.sort((a, b) => a.score - b.score);

            // Extract the actual anime objects from the search results and eliminate duplicates
            const filteredResults = mergedSearchResults.map((result) => result.item);
            const uniqueResults = filteredResults.filter((anime, index, self) =>
                index === self.findIndex((a) => a.title === anime.title)
            );

            setSearchResults(uniqueResults);
            setSearchPerformed(true); // Mark that a search has been performed
        } catch (error) {
            console.error('Error fetching anime data:', error);
        }
    };


    const handleChange = (event) => {
        searchTermParam(prev => {
            prev.set("searchTermParam", event.target.value)
            return prev
        }, { replace: true })
        setSearchPerformed(false)
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch()
        }
    }

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if it's a mobile device and set the state accordingly
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    }, []);

    return (
        <main>
            <section className={styles.headerSection}>
                <div className={styles.inputWrapper}>
                    <input
                        className={styles.searchInput}
                        type="text"
                        value={searchTerm}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Search for anime..." />

                    <button className={styles.searchBtn} onClick={() => { handleSearch(); setSearchPerformed(true) }}>
                        {isMobile ? <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                            : 'Search'}
                    </button>
                </div>
            </section>

            {/* Conditionally show search results or "No results found" message */}
            {searchPerformed && searchTerm.trim() && searchResults.length > 0 ? (
                <section className={styles.wrapper}>
                    {searchResults.map((anime, index) => (
                        <div key={index} className={styles.results} style={{ width: '100%', }}>
                            <div className={styles.searchResults} style={{ width: '100%', }}>
                                <div className={styles.container} style={{ width: '100%', }}>
                                    <Link href={`/view/${anime.anime}`}>
                                        <span className={styles.content}>
                                            <Image alt={anime.title} width={150} height={300} className={styles.image} src={anime['cover-image'][0]['portrait']} />
                                            <h4 className={styles.title}>{anime.title}</h4>
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    ))}
                </section>
            ) : searchPerformed && searchTerm.trim() && searchResults.length === 0 ? (
                <section className={styles.wrapper}>
                    <p>No results found.</p>
                </section>
            ) : null}

            <ToastContainer style={{ marginTop: '60px' }} />

            {!isMobile ? (
                <Tooltip style={{ zIndex: '999999999999' }} id="search-tooltip" />
            ) : null}
        </main>
    )
}

export default ExperimentalSearch