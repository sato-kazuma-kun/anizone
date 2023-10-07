import SuggesstionComponent from "@/components/suggesstion/suggestion";

export const metadata = {
  title: 'Browse Anime - Aniflex',
  description: 'Aniflex - Watch Anime for free',
}

export default function BrowseAnime() {
  return (
    <main>
      <section>
        <SuggesstionComponent title='Suggesstion for you' />
      </section>
    </main>
  )
}
