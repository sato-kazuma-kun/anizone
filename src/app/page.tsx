import CarouselComponent from "@/components/carousel/carousel"
import RecentlyUpdatedComponent from "@/components/recently-updated/recents"
import AMVsComponent from "@/components/amv/amv"
import TrendingComponent from "@/components/trending/trending"
import { Metadata } from "next"
import SuggesstionComponent from '@/components/suggesstion/suggestion'
import 'react-toastify/dist/ReactToastify.css'
import '@radix-ui/themes/styles.css'
import { AniflexButton } from "@/components/ui/button/aniflex-button"
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
      <footer className="flex flex-col items-center justify-center place-contents-center mb-8" style={{ marginInline: 'var(--default-pageBorder)', }}>
        <section className="flex flex-col gap-4 items-center place-contents-center justify-center">
          <div>
            <h5>You&#39;ve reached the end of the page.</h5>
          </div>

          <div className="flex flex-row items-center justify-center place-contents-center gap-3">
            <AniflexButton size="3" bgColor="purple" txtColor="white" click="/browse-anime">Browse more Anime</AniflexButton>
            <AniflexButton size="3" bgColor="purple" txtColor="white" click="/view/amv">Browse more AMVs</AniflexButton>
          </div>
        </section>
      </footer>
    </>
  )
}
