import { animeDataAPI } from '../../../../api/api.js'
import ErrorFunction from '@/components/error/error.js'
import styles from './video.module.css'
import Link from 'next/link.js'
import { Suspense } from 'react'
import Loading from '@/app/loading.js'

const datas = await animeDataAPI()

export async function generateMetadata({ params }) {
    const animeTitle = decodeURIComponent(params.anime)
    const animeEpisode = decodeURIComponent(params.video)

    const animeData = datas.find((data) => data.anime === animeTitle)
    if (!animeData) {
        return {
            title: `${animeData.title} Episode ${animeEpisode} was not found on the server.`,
        }
    } else {
        const currentEpisode = animeData.episodes.find((episode) => episode.episode === animeEpisode)

        if (!currentEpisode) {
            return {
                title: `${animeData.title} Episode ${animeEpisode} was not found on the server.`,
            }
        } else {
            return {
                title: `${animeData.title} Episode ${currentEpisode.episode}`,
                description: animeData.description,
            }
        }
    }
}

export default async function Anime({ params }) {
    const animeTitle = decodeURIComponent(params.anime)
    const animeEpisode = decodeURIComponent(params.video)

    const animeData = datas.find((data) => data.anime === animeTitle)
    if (!animeData) {
        return (
            <Suspense fallback={<Loading />}>
                <main>
                    <ErrorFunction />
                </main>
            </Suspense>
        )
    } else {
        const currentEpisode = animeData.episodes.find((episode) => episode.episode === animeEpisode)

        if (!currentEpisode) {
            return (
                <Suspense fallback={<Loading />}>
                    <main>
                        <ErrorFunction />
                    </main>
                </Suspense>
            )
        } else {
            return (
                <Suspense fallback={<Loading />}>
                    <main>
                        <section className={styles.videoSection}>
                            <div className={styles.container}>
                                <div className={styles.videoPlayer} id="content">
                                    <video controls autoPlay preload="metadata" className={styles.mainVideo} poster={currentEpisode.thumbnailLandscape}>
                                        {/* <source src={currentEpisode.media['1080p']} className={`styles.${currentEpisode.media['1080p']}`} size={currentEpisode.media['1080p']} type="video/mp4" /> */}
                                        {currentEpisode.media.map((media) => (
                                            <source
                                                key={media.resolution}
                                                src={media.url}
                                                className={`styles.${media.resolution}`} // Replace 'styles' with your CSS class name for styling each resolution if needed
                                                size={media.resolution}
                                                type="video/mp4"
                                            />
                                        ))}
                                        {/* <track label="English" kind="subtitles" src={currentEpisode.media['1080p']} srclang="en" id="subEN" /> */}
                                    </video>
                                </div>
                            </div>

                            <div className={styles.videoDetails} id="details">
                                <h5 className={styles.title} id="title">{animeData.title} Episode {currentEpisode.episode}</h5>
                            </div>
                        </section>

                        <script
                            dangerouslySetInnerHTML={{
                                __html: `
                                        const animeTitle = ${JSON.stringify(animeData.title)};
                                        const videoPlayer = document.getElementById('content').querySelector('video');
                                        const episodesData = ${JSON.stringify(animeData.episodes)};
                                        const currentEpisodeNumber = ${parseInt(animeEpisode) - 1}; // Adjusting the offset
                                        const totalEpisodes = ${animeData.episodes.length};
                                        const videoTitle = document.getElementById('title')

                                        videoPlayer.addEventListener('ended', () => {
                                            if (currentEpisodeNumber < totalEpisodes - 1) { // Adjusting the offset
                                            const nextEpisode = episodesData.find((episode) => episode.episode === (currentEpisodeNumber + 2).toString()); // Adjusting the offset
                                            console.log('Next Episode:', nextEpisode, nextEpisode.media[0].url);
                                            if (nextEpisode) {
                                                videoPlayer.src = nextEpisode.media[0].url;
                                                console.log(nextEpisode.media[0].url);
                                                videoPlayer.load();
                                                videoPlayer.play();
                                                videoTitle.textContent =  animeTitle + ' Episode ' + nextEpisode.episode;
                                                document.title =  animeTitle + ' Episode ' + nextEpisode.episode;
                                                history.pushState(null, null, nextEpisode.watchLink); // Update the URL without redirecting
                                            }
                                            }
                                        });
                                    `,
                            }}
                        />

                        {/* <section className={styles.recommendSection}>
                            <div className={styles.recommendation}>
                                <Link href={}>
                                    <span className={styles.recommendImage}>
                                        <img className={styles.recommendThumbnail} src={recommendThumbnail} alt={ } />
                                    </span>

                                    <span className={styles.recommendData}>
                                        <p className={styles.recommendName}>{ }</p>
                                        <p className={styles.recommendEpisode}>{ }</p>
                                    </span>
                                </Link>
                            </div>
                        </section> */}
                    </main>
                </Suspense>
            )
        }
    }
}
