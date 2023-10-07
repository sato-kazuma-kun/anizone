'use client'

import { useState } from 'react';
import axios from 'axios';
import styles from './form.module.css';
import { ToastContainer, toast } from 'react-toastify';

const resolutions = ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];

export default function AdminDashboardAmvUploadComponent() {
    const [AmvData, setAmvData] = useState({
        tags: [],
        thumbnail: '',
        title: '',
        media: [],
        duration: '',
        uploadDate: '',
        url: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'tags') {
            // Split the input by commas and trim whitespace for each tag
            const tagsArray = value.split(',').map((tag) => tag.trim());
            setAmvData((prevData) => ({ ...prevData, [name]: tagsArray }));
        } else {
            setAmvData((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const handleMediaChange = (mediaIndex, e) => {
        const { name, value } = e.target;
        setAmvData((prevData) => {
            const updatedMedia = [...prevData.media];
            updatedMedia[mediaIndex][name] = value;
            return { ...prevData, media: updatedMedia };
        });
    };

    const handleAddMedia = () => {
        setAmvData((prevData) => {
            const updatedMedia = [...prevData.media, { resolution: '', url: '' }];
            return { ...prevData, media: updatedMedia };
        });
    };

    const handleAmvSubmit = async (e) => {
        e.preventDefault();

        try {
            // Update the endpoint to the correct URL for AMV uploads
            await axios.post(process.env.NEXT_PUBLIC_AMV_UPLOAD, AmvData);
            toast.info('AMV data uploaded successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Failed to upload AMV data');
        }
    };

    return (
        <div id='uploadForm' className='w-full'>
            <form onSubmit={handleAmvSubmit} className="w-full px-4 border rounded shadow-lg">
                <div className="my-4">
                    <label className="block font-bold mb-2">Tag:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="tags" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Thumbnail:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="thumbnail" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Title:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="title" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Duration:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="duration" onChange={handleChange} />
                </div>

                <div className="my-4">
                    <label className="block font-bold mb-2">Url:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="url" onChange={handleChange} />
                </div>


                <div className="my-4">
                    <label className="block font-bold mb-2">Uploaded:</label>
                    <input className="w-full px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300" type="text" name="uploadDate" onChange={handleChange} />
                </div>

                <div className="my-4 mt-8">
                    <label className="block font-bold mb-2">Media:</label>

                    {/* Media Inputs */}
                    {AmvData.media.map((media, mediaIndex) => (
                        <>
                            <div key={mediaIndex} className='flex flex-row w-full flex-wrap gap-4 p-4 place-content-center'>
                                <input
                                    className="w-2/5 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    type="text"
                                    name="resolution"
                                    value={media.resolution}
                                    onChange={(e) => handleMediaChange(mediaIndex, e)}
                                    placeholder={`Resolution (e.g., ${resolutions.join(', ')})`} />
                            
                                <input
                                    className="w-2/5 px-2 py-1 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                    type="text"
                                    name="url"
                                    value={media.url}
                                    onChange={(e) => handleMediaChange(mediaIndex, e)}
                                    placeholder={`Url (e.g., ${resolutions.join(', ')})`} />
                            </div>
                        </>
                    ))}
                    <div className='mt-1 flex place-content-center'>
                        <button className={`mb-9 text-white px-3 py-1 rounded ${styles.btn}`} type="button" onClick={handleAddMedia}>
                            Add resolutions
                        </button>
                    </div>
                </div>

                {/* Submit button */}
                <div className='py-5 flex place-content-left'>
                    <button className={`text-white px-4 rounded ${styles.btn}`} type="submit">Upload AMV to Database</button>
                </div>
            </form>

            <ToastContainer style={{ marginTop: '60px' }} />
        </div>
    );
}
