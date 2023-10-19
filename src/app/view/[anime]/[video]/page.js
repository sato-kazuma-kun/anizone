import { animeDataAPI } from '@/api/api'
import ErrorComponent from '@/components/error/error'
import LoadingComponent from '@/components/loading/loading';
import Link from 'next/link';
import { AnimeIFrameComponent } from '@/components/video-player/iframe';

export async function generateMetadata({ params }) {
    const datas = await animeDataAPI();
    const animeTitle = decodeURIComponent(params.anime);
    const animeData = datas.find(data => data?.anime === animeTitle);
    const animeEpisode = decodeURIComponent(params.video)

    return {
        title: `${animeData?.title} Episode ${animeEpisode}` ?? `"${animeTitle}" Episode "${animeEpisode}" was not found on the server.`,
        description: `${animeData?.title} Episode ${animeEpisode}` ?? `"${animeTitle}" Episode "${animeEpisode}" was not found on the server.`,
    }
}

export default async function Anime({ params }) {
    const datas = await animeDataAPI();
    const animeTitle = decodeURIComponent(params.anime);
    const animeData = datas.find(data => data.anime === animeTitle);
    const animeEpisode = decodeURIComponent(params.video)
    const currentEpisode = animeData?.episodes.find((episode) => episode.episode === animeEpisode)
    const mediaObject = currentEpisode?.media[0];

    return animeData || currentEpisode ? (
        <main>
            <section className={`flex flex-col w-full`}>

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
    );
}
