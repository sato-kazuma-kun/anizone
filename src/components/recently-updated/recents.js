'use client'

import Link from 'next/link'
import { animeDataAPI } from '@/api/api'
import styles from './recents.module.css'
import Loading from '@/components/loading/loading'
import React, { useEffect, useState } from 'react'
import ErrorComponent from '@/components/error/error'
import Image from 'next/image.js'
import HeadingComponent from '@/components/heading/heading'

export default function RecentlyUpdatedComponent({ title, link, link_title }) {
    const [datas, setDatas] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchanimeDataAPI() {
        try {
            setIsLoading(true) // Set isLoading to true before the API call
            setError(null)

            const datas = await animeDataAPI()
            const fetchedData = datas.slice(-Math.min(datas.length, 8))
            setDatas(fetchedData)

            setIsLoading(false)
        } catch (error) {
            console.error('Failed to fetch recently updated data:', error)
            setError('Failed to fetch recently updated data. Please try again later.')

            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchanimeDataAPI()
    }, [])

    async function retryFetchingRecentlyUpdated() {
        setError(null)
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 500))
        fetchanimeDataAPI()

        setIsLoading(false)
    }

    return (
        <section id="recentlyUpdated" className={styles.recentlyUpdated}>

            <HeadingComponent title='Recently updated' link={link} link_title={link_title} />

            {/* On error it'll render this element */}
            {error && <ErrorComponent error={error} onRetryClick={retryFetchingRecentlyUpdated} />}

            {/* If loading it'll render this element */}
            {isLoading && <Loading />}

            {/* If not loading and there are no error then it'll render this element */}
            {!error && !isLoading && (
                <div className={styles.justUpdatedDiv}>
                    {datas?.map(data => (
                        <span key={data.title} className={styles.justUpdatedSpan}>
                        <Link className={styles.thumbnailLink} href={`/view/${data.anime}/${data.episodes[data.episodes.length - 1].episode}`}>
                                <Image width={300} height={168} className={styles.thumbnail} src={`${data.episodes[data.episodes.length - 1].thumbnail}`} alt={data.title} />
                                <div className={styles.videoTitle}>{data.title}</div>
                                {/* <div className={styles.videoData}>Episode {data.episodes[data.episodes.length - 1].episode}</div> */}
                                <div className={styles.videoData}>
                                  {(() => {
                                    switch (data.episodes[data.episodes.length - 1].episode) {
                                      case 1:
                                        return `Episode ${data.episodes[data.episodes.length - 1].episode}`;
                                      case 'full-movie':
                                        return 'Full movie';
                                      case 'ova':
                                        return 'OVA';
                                      case 'special':
                                        return 'Special Episode';
                                      default:
                                        return 'Unknown Type';
                                    }
                                  })()}
                                </div>

                                <div className={styles.videoDuration}>{data.episodes[data.episodes.length - 1].duration}</div>
                                <div className={styles.videoWatch}>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#f47521" height="24px" width="24px" version="1.1" id="Capa_1" viewBox="0 0 24 24" xmlSpace="preserve">
                                        <g>
                                            <g id="c98_play">
                                                <path d="M2.067,0.043C2.21-0.028,2.372-0.008,2.493,0.085l13.312,8.503c0.094,0.078,0.154,0.191,0.154,0.313c0,0.12-0.061,0.237-0.154,0.314L2.492,17.717c-0.07,0.057-0.162,0.087-0.25,0.087l-0.176-0.04c-0.136-0.065-0.222-0.207-0.222-0.361V0.402C1.844,0.25,1.93,0.107,2.067,0.043z" />
                                            </g>
                                            <g id="Capa_1_78_"></g>
                                        </g>
                                    </svg>
                                    <span className={styles.buttonLable}>Watch Now</span>
                                </div>
                            </Link>
                        </span>
                    ))}
                </div>
            )}
        </section>

    )
}
