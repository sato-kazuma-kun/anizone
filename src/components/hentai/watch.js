"use client"

import { hentaiDataAPI } from '@/api/api'
import ErrorComponent from '@/components/error/error'
import LoadingComponent from '@/components/loading/loading';
import Link from 'next/link';
import { AnimeIFrameComponent } from '@/components/video-player/iframe';
import VideoPlayerPage from '@/components/video-player/video-player-v2';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from '@/app/loading';
import { checkLocalStorage } from '@/utils/function';
import Image from 'next/image';

export default function WatchHentaiComponents() {
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

            const data = await hentaiDataAPI();

            // const suggestions = await calcUserPref()
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
        fetchAnimeDataAPI()

        setIsLoading(false)
    }

    const animeTitle = decodeURIComponent(params.hentai);
    const animeData = datas?.find(data => data.anime === animeTitle);
    const animeEpisode = decodeURIComponent(params.video)
    const currentEpisode = animeData?.episodes.find((episode) => episode.episode === animeEpisode)
    const mediaObject = currentEpisode?.media[0];

    return (
        <>
            {/* On error it'll render this element */}
            {error && <ErrorComponent error={error} onRetryClick={retryFetchingSuggesstion} />}

            {/* If loading it'll render this element */}
            {isLoading && <Loading />}

            {!error && !isLoading && (
                <>
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
                            {animeData || currentEpisode ? (
                                <main>
                                    <section className={`flex flex-col w-full`}>
                                        {/* <VideoPlayerPage
                    sources={currentEpisode.media}
                    controls={false}
                    autoplay={true}
                    key={currentEpisode.episode}
                    id="test-video"
                    Title={`${animeData.title} ${(() => {
                        let episodeType = `${currentEpisode.episode}`;
                        switch (episodeType) {
                            case 'full-movie':
                                return 'Full Movie';
                            case 'ova':
                                return 'OVA';
                            case 'ona':
                                return 'ONA';
                            case 'special':
                                return 'Special';
                            default:
                                return episodeType;
                        }
                    })()}`}
                /> */}

                                        <AnimeIFrameComponent animeData={animeData} params={params} />

                                        <h1 target="iframeTitle" className='pt-4'>
                                            {`${animeData.title} ${(() => {
                                                let episodeType = `${currentEpisode.episode}`;
                                                switch (episodeType) {
                                                    case 'full-movie':
                                                        return 'Full Movie';
                                                    case 'ova':
                                                        return 'OVA';
                                                    case 'ona':
                                                        return 'ONA';
                                                    case 'special':
                                                        return 'Special';
                                                    default:
                                                        return episodeType;
                                                }
                                            })()}`}
                                        </h1>
                                    </section>
                                </main>
                            ) : (
                                <main>
                                    <ErrorComponent error={!animeData ? `"${animeTitle}" was not found on the server.` : `Episode "${animeEpisode}" was not found on the server.`} onRetryClick={null} />
                                </main>
                            )}
                        </>
                    )}
                </>
            )}
        </>
    )
}
