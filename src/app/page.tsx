import CarouselComponent from "@/components/carousel/carousel"
import RecentlyUpdatedComponent from "@/components/recently-updated/recents"
import AMVsComponent from "@/components/amv/amv"
import TrendingComponent from "@/components/trending/trending"
import { Metadata } from "next"
import SuggesstionComponent from '@/components/suggesstion/suggestion'
import 'react-toastify/dist/ReactToastify.css'
import '@radix-ui/themes/styles.css'
import { Button } from "@/components/ui/button/aniflex-button"
import DataFetchingComponent from "@/components/suggesstion/suggesstion2.0"
import { calcUserPref } from '@/algorithm/anime-suggestion'

export const metadata: Metadata = {
  title: 'Aniflex',
  description: 'Watch Anime',
}

export default function HomePage() {
  return (
    <>
      <main>
        <CarouselComponent />
        <RecentlyUpdatedComponent title="Recently updated" link='/recently-updated' link_title='View More' />
        <TrendingComponent />
        <AMVsComponent title='AMVs' link='/view/amv' link_title='AMVs' />
        <SuggesstionComponent API={calcUserPref} title='Suggesstions' link='/browse-anime' link_title='Browse more' />
      </main>
    </>
  )
}
