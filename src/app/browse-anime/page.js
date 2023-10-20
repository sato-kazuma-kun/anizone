import SuggesstionComponent from "@/components/suggesstion/suggestion";
import { calcUserPref } from '@/algorithm/anime-suggestion'

export const metadata = {
  title: 'Browse Anime - Aniflex',
  description: 'Aniflex - Watch Anime for free',
}

export default function BrowseAnime() {
  return (
    <main>
      <section>
        <SuggesstionComponent API={calcUserPref} title='Suggesstion for you' />
      </section>
    </main>
  )
}
