'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import carousel from './carousel.module.css'
import { gsap } from 'gsap'
import Loading from '@/app/loading'
import Image from 'next/image'
import ErrorComponent from '@/components/error/error'
import { Tooltip } from 'react-tooltip'
import { animeDataAPI } from '@/api/api'

function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

// Main Function
export default function CarouselComponent() {
    // Initializing
    const [contents, setContents] = useState(null)
    const [error, setError] = useState(null)
    const slideWidth = 805
    const slideDuration = 5000
    const [isLoading, setIsLoading] = useState(true)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobileDevice());
    }, []);


    // function for fetching Data from an API Endpoint
    async function initializeCarousel() {
        try { // Trying this
            setIsLoading(true) // Setting the state to 'true' as the data is currently loading
            setError(null) // No error for now whatsoever

            const data = await animeDataAPI() // Calling on API endpoint
            const fetchedContents = data.slice(-Math.min(data.length, 6)) // Modifying the data to match the format
            setContents(fetchedContents) // Setting the contents to fetched data

            setIsLoading(false) // Setting the state to 'false' as the data is loaded
        } catch (error) { // In case of error
            console.error('Failed to fetch carousel contents:', error) // Console logging the error detail [For development purpose]
            setError('Failed to fetch carousel contents. Please try again later.') // Setting the Error to let the user know

            setIsLoading(false) // Setting the loading State to 'false' as there has been an error
        }
    }

    // Calling the function to fetch data
    useEffect(() => {
        initializeCarousel()
    }, [])

    // In case of an error this function can be called to try re-fetching the data
    async function retryFetchingCarousel() {
        setError(null) // Setting the error to 'null' as if there is an error we can't ignore that error so we are setting it to null to avoid any conflicts
        setIsLoading(true) // Setting the loading state to 'true' as we are about to re-fetch the data which will take some time to load

        await new Promise((resolve) => setTimeout(resolve, 500)) // Giving some time before re-fetching the data
        initializeCarousel() // Calling the function to fetch data

        setIsLoading(false) // Setting the loading state to 'false' as the data has been fetched
    }

    // Function for handeling the fetched data to make use of it and convert it to an interactive UI
    useEffect(() => {
        if (!contents) return // If contents are null/No contents then return/dont proceed

        let isAnimating = false // Letting the state of isAnimating to 'false' by default
        let currentSlide = 0 // Letting the currentSlide to be '0' by default
        let slideInterval // Letting slideInterval variable

        // Function to update slide width accourding to user's display size
        function updateSlideWidth() {
            const viewportWidth = window.innerWidth
            const width = Math.min(viewportWidth, 805)
            const slideElements = document.querySelectorAll('.slide')
            slideElements.forEach((slide) => {
                slide.style.width = width + 'px'
            })
        }

        // Function to handle previous button click to go to previous image if clicked
        function handlePrevButtonClick() {
            if (!isAnimating) {
                isAnimating = true
                const numSlides = contents.length
                currentSlide = (currentSlide - 1 + numSlides) % numSlides
                const targetLeft = currentSlide * slideWidth
                gsap.to(`.${carousel.slides}`, {
                    scrollLeft: targetLeft,
                    duration: 0.5,
                    onComplete: () => {
                        isAnimating = false
                    },
                })
                clearInterval(slideInterval)
                slideInterval = setInterval(autoAdvanceSlides, slideDuration)
            }
        }

        // Function to handle next button click to go to next image if clicked
        function handleNextButtonClick() {
            if (!isAnimating) {
                isAnimating = true
                const numSlides = contents.length
                currentSlide = (currentSlide + 1) % numSlides
                const targetLeft = currentSlide * slideWidth
                gsap.to(`.${carousel.slides}`, {
                    scrollLeft: targetLeft,
                    duration: 0.5,
                    onComplete: () => {
                        isAnimating = false
                    },
                })
                clearInterval(slideInterval)
                slideInterval = setInterval(autoAdvanceSlides, slideDuration)
            }
        }

        // Function to automatically slide through the image carousel
        function autoAdvanceSlides() {
            if (!isMobileDevice()) {
                const numSlides = contents.length
                currentSlide = (currentSlide + 1) % numSlides
                const targetLeft = currentSlide * slideWidth
                gsap.to(`.${carousel.slides}`, {
                    scrollLeft: targetLeft,
                    duration: 0.5,
                    onComplete: () => {
                        isAnimating = false
                    },
                })
            }
        }

        // Calling function to update the slide width accourding to user's display/screen size
        updateSlideWidth()
        window.addEventListener('resize', updateSlideWidth) // Updating the slide width if the user resizes the window

        // Initializing
        const prevButton = document.querySelector(`.${carousel.prevButton}`)
        const nextButton = document.querySelector(`.${carousel.nextButton}`)
        const slides = document.querySelector(`.${carousel.slides}`)

        // Adding event listener for click event on calling functions of each element respectively
        prevButton?.addEventListener('click', handlePrevButtonClick)
        nextButton?.addEventListener('click', handleNextButtonClick)
        slides?.addEventListener('wheel', (event) => {
            if (event.deltaY < 0) {
                handlePrevButtonClick();
            } else if (event.deltaY > 0) {
                handleNextButtonClick();
            }

            // Prevent the default Y-axis scrolling behavior
            event.preventDefault();
        });

        slideInterval = setInterval(autoAdvanceSlides, slideDuration)

        return () => {
            clearInterval(slideInterval)
            window.removeEventListener('resize', updateSlideWidth)
        }
    }, [contents])

    // Defining elements
    return (
        <section id='carousel' className={carousel.slider}> {/* Root Element */}

            {/* On error it'll render this element */}
            {error && <ErrorComponent error={error} onRetryClick={retryFetchingCarousel} />}

            {/* If loading it'll render this element */}
            {isLoading && <Loading />}

            {/* If not loading and there are no error then it'll render this element */}
            {!error && !isLoading && (
                <>
                    <div className={carousel.slides} style={{ overflowX: isMobile ? 'scroll' : 'hidden' }}>
                        {contents?.map((content) => (
                            <Link key={content.id} href={`/view/${content.anime}`} className={carousel.imageLink}>
                                <Image data-tooltip-id="carousel-tooltip" data-tooltip-content={content.title} alt={content.title} width={805} height={143} key={content.id} src={content['cover-image'][0]['landscape']} className={carousel.slide} id="image" />
                            </Link>
                        ))}
                    </div>

                    {!isMobile ? (
                        <div style={{ display: contents && contents.length <= 1 ? 'none' : 'flex' }} className={carousel.sliderControls}>
                            <button data-tooltip-id="carousel-tooltip" data-tooltip-content="Previous" className={carousel.prevButton}>
                                &lt;
                            </button>
                            <button data-tooltip-id="carousel-tooltip" data-tooltip-content="Next" className={carousel.nextButton}>
                                &gt;
                            </button>
                        </div>
                    ) : null}
                </>
            )}
            {!isMobile ? (
                <Tooltip style={{ zIndex: '999999999999' }} id="carousel-tooltip" />
            ) : null}
        </section>
    )
}
