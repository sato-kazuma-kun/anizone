import AMVsComponent from '@/components/amv/amv'

export const metadata = {
    title: 'AMVs - Aniflex',
    description: 'Aniflex - Watch Anime for free',
}

export default function AMVsPage() {
    return (
        <main>
            <AMVsComponent title='AMVs for you' />
        </main>
    )
}