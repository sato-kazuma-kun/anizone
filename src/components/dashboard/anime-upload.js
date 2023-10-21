'use client'

import { useState } from 'react';
import axios from 'axios';
import styles from './form.module.css'
import { ToastContainer, toast } from 'react-toastify';

const resolutions = ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];


export default function AdminDashboardAnimeUploadComponent() {
    const [animeData, setAnimeData] = useState({
        tag: '',
        anime: '',
        title: '',
        description: '',
        thumbnailPortrait: '',
        coverLandscape: '',
        japanese: '',
        synonyms: '',
        aired: '',
        premiered: '',
        status: '',
        score: '',
        studios: '',
        producers: '',
        genre: [],
        episodes: [], // Initialize episodes as an empty array
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'genre') {
            // Split the input by commas and trim whitespace for each genre
            const genresArray = value.split(',').map((genre) => genre.trim());
            setAnimeData((prevData) => ({ ...prevData, [name]: genresArray }));
        } else {
            setAnimeData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleEpisodeChange = (index, e) => {
        const { name, value } = e.target;
        setAnimeData((prevData) => {
            const updatedEpisodes = [...prevData.episodes];
            updatedEpisodes[index][name] = value;
            return { ...prevData, episodes: updatedEpisodes };
        });
    };

    const handleAddEpisode = () => {
        setAnimeData((prevData) => ({
            ...prevData,
            episodes: [
                ...prevData.episodes,
                {
                    episode: '',
                    watchLink: '',
                    thumbnailLandscape: '',
                    duration: '',
                    media: [], // Initialize media array for each new episode
                },
            ],
        }));
    };

    const handleMediaChange = (episodeIndex, mediaIndex, e) => {
        const { name, value } = e.target;
        setAnimeData((prevData) => {
            const updatedEpisodes = [...prevData.episodes];
            updatedEpisodes[episodeIndex].media[mediaIndex][name] = value;
            return { ...prevData, episodes: updatedEpisodes };
        });
    };

    const handleAddMedia = (episodeIndex) => {
        setAnimeData((prevData) => {
            const updatedEpisodes = [...prevData.episodes];
            updatedEpisodes[episodeIndex].media.push({ resolution: '', url: '' });
            
            // updatedEpisodes[episodeIndex].media.push({ [resolution]: url, });
            return { ...prevData, episodes: updatedEpisodes };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(animeData)
            await axios.post(process.env.NEXT_PUBLIC_ANIME_UPLOAD, animeData);
            toast.info('Anime data uploaded successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload anime data');
        }
    };

    return (
        <div id='uploadForm' className='w-full'>
            <form onSubmit={handleSubmit} className="w-full px-4 border rounded shadow-lg">
                <div className="my-4">
                    <label className="block font-bold mb-2">Tag:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="tag" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Anime:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="anime" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Title:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="title" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Description:</label>
                    <textarea className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" name="description" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Thumbnail Portrait:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="thumbnailPortrait" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Cover landscape:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="coverLandscape" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Japanese:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="japanese" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Synonyms:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="synonyms" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Aired:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="aired" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Premiered:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="premiered" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Status:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="status" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Score:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="score" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Studios:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="studios" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Producers:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="producers" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Genre:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="genre" onChange={handleChange} />
                </div>


                <div className="my-4 mt-8">
                    <label className="block font-bold mb-2">Episodes:</label>
                    {animeData.episodes.map((episode, episodeIndex) => (
                        <>
                            <div key={episodeIndex} className="flex flex-row flex-wrap gap-4 my-2 p-2 border rounded place-content-center">
                                <input
                                    type="number"
                                    name="episode"
                                    value={episode.episode}
                                    className="w-2/5 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    onChange={(e) => handleEpisodeChange(episodeIndex, e)}
                                    placeholder={`Episode ${episodeIndex + 1}`} />
                                <input
                                    className="w-2/5 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    type="text"
                                    name="watchLink"
                                    value={episode.watchLink}
                                    onChange={(e) => handleEpisodeChange(episodeIndex, e)}
                                    placeholder="Episode watch link" />
                                <input
                                    className="w-2/5 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    name="thumbnailLandscape"
                                    value={episode.thumbnailLandscape}
                                    onChange={(e) => handleEpisodeChange(episodeIndex, e)}
                                    placeholder="Thumbnail Landscape" />
                                <input
                                    className="w-2/5 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    name="duration"
                                    value={episode.duration}
                                    onChange={(e) => handleEpisodeChange(episodeIndex, e)}
                                    placeholder="Episode duration" />

                                {/* Media Inputs */}
                                {episode.media.map((media, mediaIndex) => (
                                    <>
                                        <div key={mediaIndex} className='flex flex-row w-full flex-wrap gap-4 place-content-center'>
                                            <input
                                                className="w-2/5 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                                type="text"
                                                name="resolution"
                                                value={media.resolution}
                                                onChange={(e) => handleMediaChange(episodeIndex, mediaIndex, e)}
                                                placeholder={`Resolution (e.g., ${resolutions.join(', ')})`} />
                                            <input
                                                className="w-2/5 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                                type="text"
                                                name="url"
                                                value={media.url}
                                                onChange={(e) => handleMediaChange(episodeIndex, mediaIndex, e)}
                                                placeholder={`URL (e.g., xxx Episode ${episodeIndex + 1}-${resolutions.join(', ')}.mp4)`} />
                                        </div>
                                    </>
                                ))}
                            </div>
                            <div className='mt-1 flex place-content-center'>
                                <button className={`mb-9 text-white px-3 py-1 rounded  ${styles.btn}`} type="button" onClick={() => handleAddMedia(episodeIndex)}>
                                    Add resolutions
                                </button>
                            </div>
                        </>
                    ))}
                    <div className='flex place-content-center'>
                        <button className={`text-white px-3 rounded ${styles.btn}`} type="button" onClick={handleAddEpisode}>
                            Add episodes
                        </button>
                    </div>
                </div>
                <div className='py-5 flex place-content-left'>
                    <button className={`text-white px-4 rounded ${styles.btn}`} type="submit">Upload Anime to Database</button>
                </div>
            </form>

            <ToastContainer style={{ marginTop: '60px' }} />
        </div>
    );
};

