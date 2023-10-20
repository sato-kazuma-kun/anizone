'use client'

import { useState, useEffect } from 'react'
import Fuse from 'fuse.js'
import Link from 'next/link'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './search.module.css'
import { Tooltip } from 'react-tooltip'
import { animeDataAPI, amvAPI } from '@/api/api'
import Image from 'next/image'

export default function SearchComponent() {
    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [searchPerformed, setSearchPerformed] = useState(false) // Track if a search has been performed


    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            toast.info('Please enter a search term.');
            return;
        }

        try {
            // const data = await animeDataAPI()
            // console.log(data)

            const [animeResult, amvResult] = await Promise.all([animeDataAPI(), amvAPI()]);

            const searchTermsArray = searchTerm.trim().split(/\s+/); // Split search terms based on spaces

            // // Create an array of Fuse instances with different keys
            // const fuseInstances = ['tag', 'title', 'japanese', 'genre', 'studios', 'synonyms'].map((key) =>
            //     new Fuse(data, {
            //         keys: [key],
            //         includeScore: true,
            //         threshold: 0.3,
            //     })
            // );

            // // Perform search on each Fuse instance and merge results
            // let mergedSearchResults = [];
            // for (const fuse of fuseInstances) {
            //     for (const term of searchTermsArray) {
            //         const currentResults = fuse.search(term);
            //         mergedSearchResults = [...mergedSearchResults, ...currentResults];
            //     }
            // }

            const animeFuse = new Fuse(animeResult, {
                keys: ['tag', 'title', 'japanese', 'genre', 'studios', 'synonyms'],
                includeScore: true,
                threshold: 0.3,
            });

            const amvFuse = new Fuse(amvResult, {
                keys: ['title'],
                includeScore: true,
                threshold: 0.3,
            });

            // Perform search on each Fuse instance and merge results
            let mergedSearchResults = [];
            for (const term of searchTermsArray) {
                const animeResults = animeFuse.search(term);
                const amvResults = amvFuse.search(term);
                mergedSearchResults = [...mergedSearchResults, ...animeResults, ...amvResults];
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
        setSearchTerm(event.target.value)
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

    console.log(searchResults)

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

            {searchPerformed && searchTerm.trim() && searchResults.length > 0 ? (
                <section className={styles.wrapper}>

                    {searchResults.some(result => result.anime) && (
                        <h2 style={{ paddingTop: '2rem', paddingLeft: '1rem', }}>Anime:</h2>
                    )}

                    <div className={styles.animeSection}>

                        {searchResults.map((result, index) => (
                            result.anime && (
                                <div key={index} className={styles.results} style={{ width: '100%' }}>
                                    <div className={styles.searchResults} style={{ width: '100%' }}>
                                        <div className={styles.container} style={{ width: '100%' }}>
                                            <Link href={`/view/${result.anime}`}>
                                                <span className={styles.content}>
                                                    <Image
                                                        alt={result.title}
                                                        width={150}
                                                        height={300}
                                                        className={styles.image}
                                                        src={result['cover-image'][0]['portrait']}
                                                    />
                                                    <h4 className={styles.title}>{result.title}</h4>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>

                    {searchResults.some(result => result.amv) && (
                        <h2 style={{ paddingTop: searchResults.some(result => result.anime) ? '2rem' : '0', paddingLeft: '1rem', width: '100%', borderTop: searchResults.some(result => result.anime) ? '2px solid var(--color)' : 'none', }}>AMV:</h2>
                    )}

                    <div className={styles.amvSection}>
                        {searchResults.map((result, index) => (
                            result.amv && (
                                <div key={index} className={styles.results} style={{ width: '100%', }}>
                                    <div className={styles.searchResults} style={{ width: '100%', }}>
                                        <div className={styles.container} style={{ width: '100%', }}>
                                            <Link href={`/view/amv/${result.title}`} style={{ width: '100%', }}>
                                                <span className={styles.content} style={{ width: '100%', }}>
                                                    <Image alt={result.title} width={150} height={300} className={styles.image} src={result.thumbnail} />
                                                    <h4 className={styles.title}>{result.title}</h4>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
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