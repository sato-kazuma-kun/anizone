"use client"

import { hentaiDataAPI } from '@/api/api'
import styles from './anime.module.css'
import Link from 'next/link.js'
import ErrorComponent from '@/components/error/error'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { checkLocalStorage } from '@/utils/function'
import { useState, useEffect } from 'react'
import Loading from '@/app/loading'

export default function ViewHentai() {
    const params = useParams()
    const [isR18PlusChecked, setIsR18PlusChecked] = useState('unchecked');

    useEffect(() => {
        const showR18Plus = checkLocalStorage('ShowR18+', 'unchecked');
        setIsR18PlusChecked(showR18Plus);
    }, []);

    const [datas, setDatas] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchAnimeDataAPI() {
        try {
            setIsLoading(true) // Set isLoading to true before the API call
            setError(null)

            const data = await hentaiDataAPI()
            setDatas(data)

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
        hentaiDataAPI()

        setIsLoading(false)
    }

    const animeTitle = decodeURIComponent(params.hentai)
    const animeData = datas?.find(data => data.anime === animeTitle)

    return (
        <>
            {/* On error it'll render this element */}
            {error && <ErrorComponent error={error} onRetryClick={retryFetchingSuggesstion} />}

            {/* If loading it'll render this element */}
            {isLoading && <Loading />}

            {!error && !isLoading && (
                <section>
                    <div>
                        {isR18PlusChecked === 'unchecked' && (
                            <div className={`flex items-center place-content-center flex-col h-full text-center ${styles.margin}`}>
                                <h1 className='text-red-500 text-3xl mb-8'>Restricted Area - Aniflex</h1>
                                <Image className='mb-10 w-full max-w-[100px]' src="/assets/images/image.webp" width={150} height={150} alt="Otaku Warning Image" />
                                {/* <img className='mb-10 w-full max-w-[100px]' src="/assets/images/18.png" alt="Otaku Warning Image" /> */}
                                <p className='text-gray-400 text-base mb-5'>
                                    Ah, fellow man of culture! It seems you have stumbled upon a restricted area within the Aniflex.
                                    However, entry to this sanctum is strictly reserved for those with true appreciation for the art of anime
                                    and manga.
                                    Alas, as your cookie of permission has been found lacking, we must kindly ask you to refrain from venturing
                                    further.
                                </p>
                                <p className='text-gray-400 text-base mb-5'>
                                    Rest assured, once your love for the Otaku world reaches its zenith and you obtain the sacred permission,
                                    you shall be granted access to the secrets within.
                                    Until then, we invite you to indulge in other captivating parts of our realm, where tales and wonders await
                                    at every corner.
                                </p>
                                <p className='text-gray-400 text-base mb-5'>
                                    Should you need any guidance or assistance on your journey to becoming a seasoned otaku, please feel free to&nbsp;
                                    <a className='text-[#e5e7eb] inline-block after:content-[""] after:w-0 after:h-[2px] after:block after:bg-[#e5e7eb] after:transition-all hover:after:w-full' href="https://example.com/contact">contact us</a>.
                                    May your path be filled with enlightening anime, captivating manga, and unforgettable adventures!
                                </p>
                            </div>
                        )}

                        {isR18PlusChecked === 'checked' && (
                            <>
                                {animeData ? (
                                    <main>
                                        <div className={styles.content}>
                                            <div className={styles.animeHeader} style={{ paddingBottom: '1rem', }}>
                                                <div className={styles.imgInfos}>
                                                    <Image alt={animeData.title} width={200} height={100} src={animeData['cover-image'][0]['portrait']} className={styles.thumbnailPortrait} />
                                                </div>

                                                <div className={styles.basicInfos}>
                                                    <h2 className={styles.animeTitle}>{animeData.title}</h2>

                                                    {animeData.description !== '' ? (
                                                        <p className={styles.animeDescription}>{animeData.description}</p>
                                                    ) : (
                                                        <p className={styles.animeDescription}>No synopsis added</p>
                                                    )}
                                                </div>

                                                <div className={styles.animeInfos}>
                                                    <p className={styles.Description}>
                                                        Overview -
                                                    </p>

                                                    <hr className={styles.divider} />

                                                    <p className={styles.Description}>
                                                        <span className={styles.preDescription}>Japanese:</span>

                                                        {animeData.japanese !== '' ? (
                                                            <> {animeData.japanese}</>
                                                        ) : (
                                                            <> No data added</>
                                                        )}
                                                    </p>

                                                    <p className={styles.Description}>
                                                        <span className={styles.preDescription}>Aired:</span>

                                                        {animeData.aired !== '' ? (
                                                            <> {animeData.aired}</>
                                                        ) : (
                                                            <> No data added</>
                                                        )}
                                                    </p>

                                                    <p className={styles.Description}>
                                                        <span className={styles.preDescription}>Status:</span>

                                                        {animeData.status !== '' ? (
                                                            <> {animeData.status}</>
                                                        ) : (
                                                            <> No data added</>
                                                        )}
                                                    </p>

                                                    <p className={styles.Description}>
                                                        <span className={styles.preDescription}>MAL Score:</span>

                                                        {animeData.ratings !== '' ? (
                                                            <> {animeData.ratings}</>
                                                        ) : (
                                                            <> No data added</>
                                                        )}
                                                    </p>

                                                    <hr className={styles.divider} />

                                                    <p className={styles.Description}>
                                                        <span className={styles.preDescription}>Studios:</span>

                                                        {animeData.studios !== '' ? (
                                                            <> {animeData.studios}</>
                                                        ) : (
                                                            <> No data added</>
                                                        )}
                                                    </p>

                                                    <p className={styles.Description}>
                                                        <span className={styles.preDescription}>Producers:</span>

                                                        {animeData.producers !== '' ? (
                                                            <> {animeData.producers}</>
                                                        ) : (
                                                            <> No data added</>
                                                        )}
                                                    </p>

                                                    <hr className={styles.divider} />

                                                    <p className={styles.Description}>
                                                        <span className={styles.preDescription}>Genre:</span>

                                                        {animeData.genre !== '' ? (
                                                            <> {animeData.genre}</>
                                                        ) : (
                                                            <> No data added</>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>

                                            <h3 className={styles.seasonTitle}>{animeData.title}</h3>

                                            <hr className={styles.divider} />
                                        </div>

                                        <div className={styles.wrapper}>
                                            {animeData.episodes.map(episode => (
                                                <div key={episode.title} className={styles.episodes}>
                                                    <div className={styles.container}>
                                                        <Link href={`/view/hentai/${animeData.anime}/${episode.episode}`}>
                                                            <span className={styles.contents}>
                                                                <div className={styles.thumbnail}>
                                                                    <span className={styles.imgContainer}>
                                                                        <Image alt={animeData.title} width={320} height={180} className={styles.image} src={`${episode.thumbnail}`} />
                                                                    </span>
                                                                    <div className={styles.videoDuration}>
                                                                        {episode.duration}
                                                                    </div>
                                                                </div>

                                                                <span className={styles.metadata}>
                                                                    <p className={styles.dataTitle}>{animeData.title}</p>
                                                                    <h4 className={styles.dataEpisode}>{animeData.title} {episode.episode}</h4>
                                                                </span>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </main>
                                ) : (
                                    <main>
                                        <ErrorComponent error={`"${animeTitle}" Was Not Found, Please Check the Link!`} onRetryClick={null} />
                                    </main>
                                )}
                            </>
                        )}
                    </div>
                </section>
            )}
        </>
    )
}