"use client"

import { useState, useEffect } from 'react';
import LoadingComponent from '@/components/loading/loading';
import { animeDataAPI } from '@/api/api';
import Link from 'next/link';
import styles from './suggesstion.module.css';
import Image from 'next/image';
import HeadingComponent from '@/components/heading/heading';
import { Button } from '@/components/ui/button/aniflex-button';
import NoDataLeft from '@/components/notify/no-data-left';
import ErrorComponent from '@/components/error/error';

async function fetchData(count, setError) {
    try {
        const promises = Array.from({ length: count }, () => animeDataAPI());
        const data = await Promise.all(promises);
        return data;
    } catch (error) {
        console.error('Failed to fetch recently updated data:', error);
        setError('Failed to fetch recently updated data. Please try again later.');
        throw error; // Rethrow the error for handling in the calling code
    }
}

export default function DataFetchingComponent({ title, link, link_title }) {
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noMoreData, setNoMoreData] = useState(false);
    const [loadCount, setLoadCount] = useState(16); // Initial load count
    const [totalFetched, setTotalFetched] = useState(0);

    const loadData = () => {
        setLoading(true);
        fetchData(loadCount, setError).then((newData) => {
            const updatedData = [...data, ...newData];
            setData(updatedData);

            // Calculate the total number of data items fetched
            const newTotalFetched = totalFetched + newData.length;

            // Check if we've fetched a total of 45 items or if we run out of data
            if (newTotalFetched >= 45 || newData.length < loadCount) {
                setNoMoreData(true);
            } else {
                setLoadCount(8); // Load 8 more with each button click
            }
            setLoading(false);
            setTotalFetched(newTotalFetched);
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    async function retryFetchingSuggesstion() {
        setError(null);
        setLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 500));
        fetchData(loadCount, setError).then((newData) => {
            const updatedData = [...data, ...newData];
            setData(updatedData);

            // Calculate the total number of data items fetched
            const newTotalFetched = totalFetched + newData.length;

            // Check if we've fetched a total of 45 items or if we run out of data
            if (newTotalFetched >= 45 || newData.length < loadCount) {
                setNoMoreData(true);
            } else {
                setLoadCount(8); // Load 8 more with each button click
            }
            setLoading(false);
            setTotalFetched(newTotalFetched);
        });

        setLoading(false);
    }

    return (
        <section id='suggesstion' className={styles.container}>
            <HeadingComponent title={title} link={link} link_title={link_title} />

            {error && <ErrorComponent error={error} onRetryClick={retryFetchingSuggesstion} />}
            {!error && (
                <>
                    {data.length === 0 && noMoreData ? (
                        <p>No data left to display.</p>
                    ) : (
                        <>
                            <div id="content-container" className={styles.contentContainer}>
                                {data.map((items) => (
                                    <>
                                        {items.map((item, itemIndex) => (
                                            <div key={itemIndex} className={styles.suggestionDiv}>
                                                <Link href={`/view/${item.anime}`}>
                                                    <span className={styles.flexSpan}>
                                                        <Image alt={item.title} width={300} height={168} className={styles.newStyleBackground} src={item['cover-image'][0]['landscape']} />
                                                    </span>
                                                    <div className={styles.newStyleMain}>
                                                        <span style={{ width: '50%', paddingLeft: '.5rem' }}>
                                                            <Image alt={item.title} width={150} height={225} className={styles.newStyleForeground} src={item['cover-image'][0]['portrait']} />
                                                        </span>
                                                        <span style={{ width: '50%', paddingLeft: '.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                                            <p className={styles.newStyleText}>
                                                                <b>{item.title}</b>
                                                                <br />
                                                            </p>
                                                            <span
                                                                className={styles.newStyleType}
                                                                style={{ color: item.type === 'Movie' ? '#2abdbb' : '#f47521' }}
                                                            >
                                                                {item.type}
                                                            </span>
                                                        </span>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </>
                    )}

                    {!noMoreData ? (
                        loading ? (
                            <LoadingComponent />
                        ) : (
                            <div id='loading button' className="flex flex-row items-center justify-center place-contents-center gap-3 pt-4">
                                <Button disabled={loading} size="3" bgColor="purple" txtColor="white" functionClick={loadData} linkClick={null}>Load More</Button>
                            </div>
                        )
                    ) : (
                        <NoDataLeft />
                    )}
                </>
            )}
        </section>
    );
}
