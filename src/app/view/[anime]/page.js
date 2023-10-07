import { animeDataAPI } from '@/api/api'
import styles from './anime.module.css'
import Link from 'next/link.js'
import ErrorComponent from '@/components/error/error'
import Image from 'next/image'

export async function generateMetadata({ params }) {
    const datas = await animeDataAPI()
    const animeTitle = decodeURIComponent(params.anime)
    const animeData = datas?.find(data => data.anime === animeTitle)

    return {
        title: animeData?.title ?? `"${animeTitle}" was not found on the server.`,
        description: animeData?.description ?? `"${animeTitle}" was not found on the server.`,
    }
}

export default async function Anime({ params }) {
    const datas = await animeDataAPI()

    const animeTitle = decodeURIComponent(params.anime)

    const animeData = datas.find(data => data.anime === animeTitle)

    return animeData ? (
        <main>
            <div className={styles.content}>
                <div className={styles.animeHeader}>
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
                            <Link href={`/view/${animeData.anime}/${episode.episode}`}>
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
    );

    // return (
    //     <Suspense fallback={<Loading />}>
    //         {animeData ?

    //             <main>
    //                 <div className={styles.content}>
    //                     <div className={styles.animeHeader}>
    //                         <div className={styles.imgInfos}>
    //                             <img src={animeData.thumbnailPortrait} className={styles.thumbnailPortrait} />
    //                         </div>

    //                         <div className={styles.basicInfos}>
    //                             <h2 className={styles.animeTitle}>{animeData.title}</h2>

    //                             {animeData.description !== '' ? (
    //                                 <p className={styles.animeDescription}>{animeData.description}</p>
    //                             ) : (
    //                                 <p className={styles.animeDescription}>No sypnosis added</p>
    //                             )}

    //                         </div>

    //                         <div className={styles.animeInfos}>
    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>Japanese:</span> {animeData.japanese}
    //                             </p>

    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>Synonyms:</span> {animeData.synonyms}
    //                             </p>

    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>Aired:</span> {animeData.aired}
    //                             </p>

    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>Premiered:</span> {animeData.premiered}
    //                             </p>

    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>Status:</span> {animeData.status}
    //                             </p>

    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>MAL Score:</span> {animeData.score}
    //                             </p>

    //                             <hr className={styles.divider} />

    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>Studios:</span> {animeData.studios}
    //                             </p>

    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>Producers:</span> {animeData.producers}
    //                             </p>

    //                             <hr className={styles.divider} />

    //                             <p className={styles.Description}>
    //                                 <span className={styles.preDescription}>Genre:</span> {animeData.genre}
    //                             </p>
    //                         </div>
    //                     </div>

    //                     <h3 className={styles.seasonTitle}>{animeData.title}</h3>
    //                 </div>

    //                 <div className={styles.episodeList}>
    //                     {animeData.episodes.map((episode) => (
    //                         <div key={episode.episode} className={styles.episode}>
    //                             <a href={episode.watchLink}>
    //                                 <span>
    //                                     <div className={styles.imageContainer}>
    //                                         <img className={styles.thumbnails} src={episode.thumbnailLandscape} />
    //                                         <span className={styles.duration}>{episode.duration}</span>
    //                                     </div>
    //                                 </span>
    //                                 <span className={styles.metadata}>
    //                                     <p className={styles.dataTitle}>{animeData.title}</p>
    //                                     <h4 className={styles.dataEpisode}>{animeData.title} {episode.episode}</h4>
    //                                 </span>
    //                             </a>
    //                         </div>
    //                     ))}
    //                 </div>
    //             </main>

    //             :

    //             <main>
    //                 <ErrorFunction />
    //             </main>

    //         }
    //     </Suspense>
    // )
}
