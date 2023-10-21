"use client"

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styles from './hentai.module.css'
import Suggesstion from '@/components/suggesstion/suggestion';
import { calcUserPref } from '@/algorithm/hentai-suggestion';
import { checkLocalStorage } from '@/utils/function';

export default function HentaiComponent() {
    const [isR18PlusChecked, setIsR18PlusChecked] = useState('unchecked');

    useEffect(() => {
        const showR18Plus = checkLocalStorage('ShowR18+', 'unchecked');
        setIsR18PlusChecked(showR18Plus);
    }, []);

    return (
        <section>
            <div>
                {isR18PlusChecked === 'unchecked' && (
                    <div className={`flex items-center place-content-center flex-col h-full text-center ${styles.margin}`}>
                        <h1 className='text-red-500 text-3xl mb-8'>Restricted Area - Aniflex</h1>
                        <Image className='mb-10 w-full max-w-[100px]' src="/assets/images/image.webp" width={150} height={150} alt="Otaku Warning Image" />
                        {/* <img className='mb-10 w-full max-w-[100px]' src="/assets/images/18.png" alt="Otaku Warning Image" /> */}
                        <p className='text-gray-400 text-base mb-5'>
                            Ah, fellow man of culture! It seems you have stumbled upon a restricted area within the Aniflex.
                            However, entry to this sanctum is strictly reserved for those with true appreciation for the art of anime
                            and manga.
                            Alas, as your cookie of permission has been found lacking, we must kindly ask you to refrain from venturing
                            further.
                        </p>
                        <p className='text-gray-400 text-base mb-5'>
                            Rest assured, once your love for the Otaku world reaches its zenith and you obtain the sacred permission,
                            you shall be granted access to the secrets within.
                            Until then, we invite you to indulge in other captivating parts of our realm, where tales and wonders await
                            at every corner.
                        </p>
                        <p className='text-gray-400 text-base mb-5'>
                            Should you need any guidance or assistance on your journey to becoming a seasoned otaku, please feel free to&nbsp;
                            <a className='text-[#e5e7eb] inline-block after:content-[""] after:w-0 after:h-[2px] after:block after:bg-[#e5e7eb] after:transition-all hover:after:w-full' href="https://example.com/contact">contact us</a>.
                            May your path be filled with enlightening anime, captivating manga, and unforgettable adventures!
                        </p>
                    </div>
                )}

                {isR18PlusChecked === 'checked' && (
                    <Suggesstion API={calcUserPref} title="Hentai" />
                )}
            </div>
        </section>
    );
}
