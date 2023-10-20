"use client"

import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notify() {
    const [toastShown, setToastShown] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      // Function to check if the user is on a mobile device
      const checkIsMobile = () => {
        return /Mobi|Android/i.test(navigator.userAgent);
      };
  
      setIsMobile(checkIsMobile());
    }, []);
  
    const containerStyle = {
      marginTop: '60px',
      width: isMobile ? '100%' : '500px',
    };

    useEffect(() => {
        // Show the toast if it hasn't been shown yet
        if (!toastShown) {
            toast.error('This is an Alpha version and only supports Computers/Laptops. There might be styling errors with mobile devices!', {
                autoClose: 6000,
                position: toast.POSITION.TOP_RIGHT,
            });
            setToastShown(true); // Mark the toast as shown
        }
    }, [toastShown]);

    return (
        <>
            {toastShown && (
                <ToastContainer style={ containerStyle } />
            )}
        </>
    );
}
