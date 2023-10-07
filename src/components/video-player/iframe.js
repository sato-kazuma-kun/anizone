"use client"

import React, { useState, useEffect } from 'react';
import ErrorComponent from '@/components/error/error';

function AmvIFrameComponent({ amvData, params }) {
    const [mediaObject, setMediaObject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                if (!mediaObject && amvData) {
                    setMediaObject(amvData.media[0]);
                }
            } catch (err) {
                setError(err);
            }
        }

        fetchData();
    }, [amvData]);

    const handleAmvRetry = () => {
        setMediaObject(null); // Reset mediaObject to trigger a re-fetch
        setError(null); // Clear the error
    };

    if (error) {
        return <ErrorComponent error={errormessage} onRetryClick={handleAmvRetry} />
    }

    return (
        <iframe
            target="videoIframe"
            src={mediaObject ? Object.values(mediaObject)[0] : ''}
            title={amvData ? amvData.title : ''}
            className="w-[65vw] h-[auto] aspect-video border-none overflow-hidden"
            allow="fullscreen; autoplay"
        ></iframe>
    );
}


function AnimeIFrameComponent({ animeData, params }) {
    const [mediaObject, setMediaObject] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                if (!mediaObject && animeData) {
                    const animeEpisode = decodeURIComponent(params.video)
                    const currentEpisode = animeData?.episodes.find((episode) => episode.episode === animeEpisode)
                    setMediaObject(currentEpisode.media[0]);
                }
            } catch (err) {
                setError(err);
            }
        }

        fetchData();
    }, [animeData]);

    const handleAnimeRetry = () => {
        setMediaObject(null); // Reset mediaObject to trigger a re-fetch
        setError(null); // Clear the error
    };

    if (error) {
        return <ErrorComponent error={error.message} onRetryClick={handleAnimeRetry} />
    }

    return (
        <iframe
            target="videoIframe"
            src={mediaObject ? Object.values(mediaObject)[0] : ''}
            title={animeData ? animeData.title : ''}
            className="w-[65vw] h-auto aspect-video border-none overflow-hidden"
            allow="fullscreen; autoplay"
        ></iframe>
    );
}

export { AmvIFrameComponent, AnimeIFrameComponent };
