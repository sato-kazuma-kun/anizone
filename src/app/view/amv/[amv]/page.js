import { amvAPI } from '@/api/api'
import ErrorComponent from '@/components/error/error'
import Link from 'next/link'
import Image from 'next/image'
import LoadingComponent from '@/components/loading/loading'
import { AmvIFrameComponent } from '@/components/video-player/iframe'

const suggesstionSection = {
    borderRadius: '6px',
    transition: 'box-shadow 200ms ease-in-out',
};

export async function generateMetadata({ params }) {
    const datas = await amvAPI();
    const amvTitle = decodeURIComponent(params.amv);
    const amvData = datas.find(data => data?.title === amvTitle);


    if (amvData.title) {
        return {
            title: amvData.title,
            description: amvData.description,
        };
    } else {
        return {
            title: 'Error - Aniflex',
            description: 'Something went wrong please try again later.',
        };
    }
}

export default async function AMV({ params }) {
    const datas = await amvAPI();
    const amvTitle = decodeURIComponent(params.amv);
    const amvData = datas.find(data => data.title === amvTitle);

    const mediaObject = amvData?.media[0];

    return amvData ? (
        <main className="flex">
            <section className={`flex flex-col w-full`}>
                <AmvIFrameComponent amvData={amvData} params={params} />

                <h1 target="iframeTitle" className='pt-4'>{amvData.title}</h1>
            </section>

            {/* <section className={`flex flex-col pl-8`} style={{ flexBasis: '35%', gap: '2rem', marginRight: '2rem' }}>
                <h1 className="">Suggestions for you</h1>
                {datas?.map(data => (
                    <div key={data.title} className={`hover:rounded-md hover:shadow-[0_0_20px_10px_#dadada] w-full`} id={data.title} style={suggesstionSection}>
                        <Link href={`/view/amv/${data.url}`} style={{ alignItems: 'top' }} className={`flex flex-row w-full nextVideoLink`}>
                            <span style={{ flexBasis: '40%' }}>
                                <Image width={320} height={180} className={`w-full w- rounded-md`} src={`${data.thumbnail}`} alt={data.title} />
                            </span>
                            <span style={{ flexBasis: '60%' }} className={`pl-3`}>
                                <p>{data.title}</p>
                            </span>
                        </Link>
                    </div>
                ))}
            </section> */}
        </main>
    ) : (
        <main>
            <ErrorComponent error="AMV Not Found, Please Check the Link!" onRetryClick={null} />
        </main>
    );
}
