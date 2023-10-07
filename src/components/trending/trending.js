import { animeDataAPI } from "@/api/api"
import styles from './trending.module.css'
import Link from "next/link"
import HeadingComponent from '@/components/heading/heading'
import Image from "next/image"

export default async function TrendingComponent() {
    const data = await animeDataAPI()
    const datas = data.slice(-Math.min(data.length, 5))

    return (
        <section>
            <HeadingComponent title='Trending this season #5' link={null} link_title={null} />

            <div className={styles.wrapper}>
                {datas?.map(data => (
                    <div key={data.anime} className={styles.container}>
                        <Link href={`/view/${data.anime}`}>
                            <span className={styles.content}>
                                <Image alt={data.title} width={200} height={300} className={styles.image} src={data['cover-image'][0]['portrait']} />
                                <h4 className={styles.title}>{data.title}</h4>
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    )
}
