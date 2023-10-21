'use client'

import styles from './suggesstion.module.css'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ErrorComponent from '@/components/error/error'
import Loading from '@/app/loading'
import Image from 'next/image'
import HeadingComponent from '@/components/heading/heading'

export default function Suggesstion({ title, link, link_title, API }) {
    const [datas, setDatas] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchAnimeDataAPI() {
        try {
            setIsLoading(true) // Set isLoading to true before the API call
            setError(null)

            const suggestions = await API()

            // const suggestions = await calcUserPref()
            setDatas(suggestions)

            setIsLoading(false)
        } catch (error) {
            console.error('Failed to fetch recently updated data:', error)
            setError('Failed to fetch recently updated data. Please try again later.')

            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAnimeDataAPI()
    }, [])

    async function retryFetchingSuggesstion() {
        setError(null)
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 500))
        fetchAnimeDataAPI()

        setIsLoading(false)
    }

    return (
        <section id='suggesstion' className={styles.container}>

            <HeadingComponent title={title} link={link} link_title={link_title} />

            {/* On error it'll render this element */}
            {error && <ErrorComponent error={error} onRetryClick={retryFetchingSuggesstion} />}

            {/* If loading it'll render this element */}
            {isLoading && <Loading />}

            {/* If not loading and there are no error then it'll render this element */}
            {!error && !isLoading && (
                <>
                    <div id="content-container" className={styles.contentContainer}>
                        {datas?.map(data => (
                            <div key={data.title} className={styles.suggestionDiv}>
                                <Link href={data.type === 'hentai' ? `/view/hentai/${data.anime}` : `/view/${data.anime}`}>
                                    <span className={styles.flexSpan}>
                                        <Image alt={data.title} width={300} height={168} className={styles.newStyleBackground} src={data['cover-image'][0]['landscape']} />
                                    </span>
                                    <div className={styles.newStyleMain}>
                                        <span style={{ width: '50%', paddingLeft: '.5rem' }}>
                                            <Image alt={data.title} width={150} height={225} className={styles.newStyleForeground} src={data['cover-image'][0]['portrait']} />
                                        </span>
                                        <span style={{ width: '50%', paddingLeft: '.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                            <p className={styles.newStyleText}>
                                                <b>{data.title}</b>
                                                <br />
                                            </p>
                                            <span
                                                className={styles.newStyleType}
                                                style={{
                                                    color: data.type === 'movie' ? '#2abdbb' :
                                                        data.type === 'anime' ? '#f47521' :
                                                            data.type === 'hentai' ? '#c27ba0' :
                                                                data.type === 'ova' ? '#ff7f00' :
                                                                    data.type === 'special' ? '#40E0D0' : '#ffffff'
                                                }}
                                            >
                                                {data.type === 'anime' ? 'Series' : data.type.charAt(0).toUpperCase() + data.type.slice(1)}
                                            </span>

                                        </span>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </section>
    )
}
