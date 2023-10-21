import ViewHentai from "@/components/hentai/view"
import { hentaiDataAPI } from "@/api/api"

export async function generateMetadata({ params }) {
    const datas = await hentaiDataAPI()
    const animeTitle = decodeURIComponent(params.hentai)
    const animeData = datas?.find(data => data.anime === animeTitle)

    return {
        title: animeData?.title ?? `"${animeTitle}" was not found on the server.`,
        description: animeData?.description ?? `"${animeTitle}" was not found on the server.`,
    }
}

export default function ViewHentaiPage() {
    return (
        <main><ViewHentai /></main>
    )
}