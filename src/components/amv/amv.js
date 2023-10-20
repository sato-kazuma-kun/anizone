'use client'

import { amvAPI } from "@/api/api"
import styles from './amv.module.css'
import Image from "next/image"
import Link from "next/link"
import React, { useEffect, useState } from 'react'
import HeadingComponent from "@/components/heading/heading"
import Loading from "@/components/loading/loading"
import ErrorComponent from '@/components/error/error'
import { usePathname } from "next/navigation"

export default function AMVsComponent({ title, link, link_title }) {
    const [datas, setDatas] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const pathname = usePathname();

    async function fetchAmvAPI() {
        try {
            setIsLoading(true) // Set isLoading to true before the API call
            setError(null)

            const fetchedData = await amvAPI()
            setDatas(fetchedData)

            setIsLoading(false)
        } catch (error) {
            console.error('Failed to fetch recently updated data:', error)
            setError('Failed to fetch recently updated data. Please try again later.')

            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchAmvAPI()
    }, [])

    async function retryFetchingAMV() {
        setError(null)
        setIsLoading(true)

        await new Promise((resolve) => setTimeout(resolve, 500))
        fetchAmvAPI()

        setIsLoading(false)
    }

    const truncateTitle = (title, maxLength) => {
        if (title.length <= maxLength) {
            return title;
        } else {
            return title.slice(0, maxLength) + '...';
        }
    };

    return (
        <section>

            <HeadingComponent title={title} link={link} link_title={link_title} />

            {/* On error it'll render this element */}
            {error && <ErrorComponent error={error} onRetryClick={retryFetchingAMV} />}

            {/* If loading it'll render this element */}
            {isLoading && <Loading />}

            {!error && !isLoading && (
                <div className={styles.wrapper}>
                {/* <div className={styles.wrapper} style={pathname === '/view/amv' ? { borderTop: '0px' } : null}> */}
                    {datas?.map(data => (
                        <div key={data.title} className={styles.amvs}>
                            <div className={styles.container}>
                                <Link href={`/view/amv/${data.title}`} style={{ width: '100%', }}>
                                    <span className={styles.content} style={{ width: '100%', }}>
                                        <div className={styles.thumbnail}>
                                            <span className={styles.imgContainer}>
                                                <Image width={350} height={196} alt={data.title} className={styles.image} src={`${data.thumbnail}`} />
                                            </span>
                                            <div className={styles.videoDuration}>
                                                {data.duration}
                                            </div>
                                        </div>

                                        <h4 className={styles.title}>{truncateTitle(data.title, 60)}</h4>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </section>
    )
}


