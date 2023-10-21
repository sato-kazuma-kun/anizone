import { hentaiDataAPI } from "@/api/api";
import WatchHentaiComponents from "@/components/hentai/watch";

export async function generateMetadata({ params }) {
    const datas = await hentaiDataAPI();
    const animeTitle = decodeURIComponent(params.hentai);
    const animeData = datas?.find(data => data.anime === animeTitle);
    const animeEpisode = decodeURIComponent(params.video)

    return {
        title: `${animeData ? `${animeData.title} Episode ${animeEpisode}` : `${animeTitle} Episode ${animeEpisode} was not found on the server.`}`,
        description: `${animeData ? `${animeData.title} Episode ${animeEpisode}` : `${animeTitle} Episode ${animeEpisode} was not found on the server.`}`,
    }
}

export default function WatchHentai() {
    return (
        <main>
            <WatchHentaiComponents />
        </main>
    )
}