"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function Button({ txtColor, bgColor, size, children, click }) {
    const router = useRouter()

    /**********************/
    /******          ******/
    /******  STYLES  ******/
    /******          ******/
    /**********************/

    /******  Width  ******/
    let padding;
    let borderRadius;
    if (size === '1') {
        padding = '5px 10px';
        borderRadius = '2.5px';
    } else if (size === '3') {
        padding = '10px 20px';
        borderRadius = '5px';
    } else if (size === '6') {
        padding = '15px 25px';
        borderRadius = '10px';
    } else if (size === '9') {
        padding = '20px 30px';
        borderRadius = '15px';
    } else {
        padding = '10px 20px';
        borderRadius = '5px';
    }

    /******  color  ******/
    let color;
    if (txtColor === 'white') {
        color = 'white';
    } else {
        color = 'black';
    }

    /******  bgColor  ******/
    let backgroundColor;
    if (bgColor === 'purple') {
        backgroundColor = '#6c38de';
    } else if (bgColor === 'RedGreen') {
        backgroundColor = 'red';
    } else {
        backgroundColor = 'white';
    }

    /******  hoverBackgroundColor ******/
    let hoverBackgroundColor;
    if (bgColor === 'purple') {
        hoverBackgroundColor = '#6c38de';
    } else if (bgColor === 'RedGreen') {
        hoverBackgroundColor = 'green';
    } else {
        hoverBackgroundColor = 'white';
    }

    /******  opacity ******/
    let opacity = '1';
    
    /******  hoverOpacity ******/
    let hoverOpacity = '0.7';


    // State to track if the button is being hovered or touched
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            onClick={() => router.push(`${click}`)}
            style={{
                padding,
                borderRadius,
                backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
                color,
                opacity: isHovered ? hoverOpacity : opacity,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 200ms ease-in-out',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
        >
            {children}
        </button>
    );
}

export { Button };
