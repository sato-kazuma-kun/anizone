'use client'

import React, { useEffect, useRef, useState } from 'react'
import './video-player-v2.css'
import LoadingComponent from '@/components/loading/loading'
import { Tooltip } from 'react-tooltip'
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { toast } from 'react-toastify'
import './material-icons-outlined.css'
import './material-icons.css'
import Link from 'next/link'

export default function VideoPlayerPage({ sources, controls, autoplay, id, Title }) {

    useEffect(() => {

        // let's select all required tags or elements
        const video_players = document.querySelectorAll(".video_player");
        video_players.forEach(video_player => {
            const video_player_html =
                `${video_player.innerHTML}
                <p class="caption_text" target="controls"></p>
                <img class="thumbnail" target="controls"></img>
                <div class="progressAreaTime" target="controls">0:00</div>
                
                <div class="controls active" target="controls">
                    <div class="progress-area" target="controls">
                    <canvas class="bufferedBar" target="controls"></canvas>
                    <div class="progress-bar" target="controls">
                        <span target="controls"></span>
                    </div>
                    </div>

                    <div class="controls-list" target="controls">
                    <div class="controls-left" target="controls">
                        <span class="icon" target="controls">
                        <i target="controls" data-tooltip-id="control-tooltip" data-tooltip-content="Replay -10 (j)" class="material-icons fast-rewind">replay_10</i>
                        </span>

                        <span target="controls" class="icon">
                        <i target="controls" class="material-icons play_pause" >play_arrow</i>
                        </span>

                        <span target="controls" class="icon">
                        <i target="controls" data-tooltip-id="control-tooltip" data-tooltip-content="Forward +10 (l)" class="material-icons fast-forward">forward_10</i>
                        </span>

                        <span target="controls" class="icon">
                        <i target="controls" class="material-icons volume">volume_up</i>

                        <input target="controls" data-tooltip-id="control-tooltip" data-tooltip-content="Volume" value="100" type="range" min="0" max="100" class="volume_range" />
                        </span>

                        <div target="controls" class="timer">
                        <span target="controls" class="current">0:00</span> /
                        <span target="controls" class="duration">0:00</span>
                        </div>
                    </div>

                    <div target="controls" class="controls-right">
                        <span target="controls" class="icon">
                        <i target="controls" class="material-icons auto-play"></i>
                        </span>

                        <span target="controls" class="icon">
                        <i target="controls" data-tooltip-id="control-tooltip" data-tooltip-content="Caption (c)" class="material-icons captionsBtn">closed_caption</i>
                        </span>

                        <span target="controls" class="icon">
                        <i target="controls" data-tooltip-id="control-tooltip" data-tooltip-content="Settings" class="material-icons settingsBtn">settings</i>
                        </span>

                        <span target="controls" class="icon pip">
                        <i target="controls" class="material-icons picture_in_picutre">picture_in_picture_alt</i>
                        </span>

                        <span target="controls" class="icon">
                        <i target="controls" class="material-icons fullscreen">fullscreen</i>
                        </span>
                    </div>
                    </div>
                </div>

                <div target="controls" class="settings">
                    <div target="controls" data-label="settingHome">
                    <ul target="controls">
                        <li target="controls" data-label="speed">
                        <span target="controls"> Speed </span>
                        <span target="controls" class="material-symbols-outlined icon">
                            arrow_forward_ios
                        </span>
                        </li>
                        <li target="controls" data-label="quality">
                        <span target="controls"> Quality </span>
                        <span target="controls" class="material-symbols-outlined icon">
                        arrow_forward_ios
                        </span>
                        </li>
                    </ul>
                    </div>
                    <div target="controls" class="playback" data-label="speed" hidden>
                    <span target="controls">
                        <i target="controls" class="material-symbols-outlined icon back_arrow"  data-label="settingHome">
                        arrow_back
                        </i>
                        <span target="controls">Playback Speed </span>
                    </span>
                    <ul target="controls">
                        <li target="controls" data-speed="0.25">0.25</li>

                        <li target="controls" data-speed="0.5">0.5</li>

                        <li target="controls" data-speed="0.75">0.75</li>

                        <li target="controls" data-speed="1" class="active">Normal</li>

                        <li target="controls" data-speed="1.25">1.25</li>

                        <li target="controls" data-speed="1.5">1.5</li>

                        <li target="controls" data-speed="1.75">1.75</li>

                        <li target="controls" data-speed="2">2</li>
                    </ul>
                    </div>
                    <div target="controls" data-label="quality" hidden>
                    <span target="controls">
                        <i target="controls" class="material-symbols-outlined icon back_arrow" data-label="settingHome">
                        arrow_back
                        </i>
                        <span target="controls">Playback Quality </span>
                    </span>
                    <ul target="controls">
                        <li target="controls" data-quality="auto" class="active">auto</li>
                    </ul>
                    </div>
                </div>
                <div target="controls" class="captions">
                    <div target="controls" class="caption">
                    <span target="controls">Select Subtitle</span>
                    <ul target="controls">
                        
                    </ul>
                    </div>
                </div>
            `;
            video_player.innerHTML = video_player_html;

            const mainVideo = video_player.querySelector(".main-video"),
                progressAreaTime = video_player.querySelector(".progressAreaTime"),
                controls = video_player.querySelector(".controls"),
                progressArea = video_player.querySelector(".progress-area"),
                bufferedBar = video_player.querySelector(".bufferedBar"),
                progress_Bar = video_player.querySelector(".progress-bar"),
                fast_rewind = video_player.querySelector(".fast-rewind"),
                play_pause = video_player.querySelector(".play_pause"),
                fast_forward = video_player.querySelector(".fast-forward"),
                volume = video_player.querySelector(".volume"),
                volume_range = video_player.querySelector(".volume_range"),
                current = video_player.querySelector(".current"),
                totalDuration = video_player.querySelector(".duration"),
                auto_play = video_player.querySelector(".auto-play"),
                settingsBtn = video_player.querySelector(".settingsBtn"),
                captionsBtn = video_player.querySelector(".captionsBtn"),
                picture_in_picutre = video_player.querySelector(".picture_in_picutre"),
                fullscreen = video_player.querySelector(".fullscreen"),
                settings = video_player.querySelector(".settings"),
                settingHome = video_player.querySelectorAll(".settings [data-label='settingHome'] > ul > li"),
                captions = video_player.querySelector(".captions"),
                caption_labels = video_player.querySelector(".captions ul"),
                playback = video_player.querySelectorAll(".playback li"),
                tracks = video_player.querySelectorAll("track"),
                loader = video_player.querySelector(".loader"),

                thumbnail = video_player.querySelector(".thumbnail");

            if (navigator.userAgent.toLowerCase().indexOf("firefox") !== -1) {
                const pipElements = document.querySelectorAll(".pip");
                pipElements.forEach(function (element) {
                    element.style.display = 'none';
                });
            }

            document.addEventListener("keydown", e => {
                const tagName = document.activeElement.tagName.toLowerCase()

                if (tagName === "input") return

                switch (e.key.toLowerCase()) {
                    case " ":
                        if (tagName === "button") return
                    case "k":
                        togglePlayPause()
                        break
                    case "f":
                        toggleFullScreenMode()
                        toggleFullScreenToolTip()
                        break
                    case "i":
                        toggleMiniPlayerMode()
                        tooglePiPToolTip()
                        break
                    case "m":
                        toggleMute()
                        toggleVolumeToolTip()
                        break
                    case "arrowleft":
                    case "j":
                        skip(-10)
                        break
                    case "arrowright":
                    case "l":
                        skip(10)
                        break
                    // case "c":
                    //     toggleCaptions()
                    //     break
                    case "a":
                        toggleAutoPlay()
                        toggleAutoPLayToolTip()
                        break
                }
            })

            if (tracks.length != 0) {
                caption_labels.insertAdjacentHTML(
                    "afterbegin",
                    `<li target="controls" data-track="OFF" class="active">OFF</li>`
                );
                for (let i = 0; i < tracks.length; i++) {
                    let trackLi = `<li target="controls" data-track="${tracks[i].label}">${tracks[i].label}</li>`;
                    caption_labels.insertAdjacentHTML("beforeend", trackLi);
                }
            }
            const caption = captions.querySelectorAll("ul li");

            // Play video function
            function playVideo() {
                togglePlayPauseToolTip()
                play_pause.innerHTML = "pause";
                let PlayPauseText = "Pause"
                video_player.classList.add("paused");
                mainVideo.play();
            }

            // Pause video function
            function pauseVideo() {
                togglePlayPauseToolTip()
                play_pause.innerHTML = "play_arrow";
                let PlayPauseText = "Play"
                video_player.classList.remove("paused");
                mainVideo.pause();
            }

            mainVideo.addEventListener("play", () => {
                playVideo();
            });

            mainVideo.addEventListener("pause", () => {
                pauseVideo();
            });

            function togglePlayPause() {
                const isVideoPaused = video_player.classList.contains("paused");
                isVideoPaused ? pauseVideo() : playVideo();
            }

            play_pause.addEventListener("click", () => {
                togglePlayPause()
            });

            mainVideo.addEventListener("click", () => {
                togglePlayPause()
            })

            mainVideo.addEventListener("dblclick", () => {
                toggleFullScreenMode()
            })


            // ToolTip for video controls
            mainVideo.addEventListener("loadeddata", (e) => {
                togglePlayPauseToolTip()
                toggleVolumeToolTip()
                tooglePiPToolTip()
                toggleFullScreenToolTip()
                toggleAutoPLayToolTip()
                handleVisibilityAndCursor()
            })

            function togglePlayPauseToolTip() {
                const isVideoPaused = video_player.classList.contains("paused");
                play_pause.setAttribute("data-tooltip-id", "control-tooltip");
                play_pause.setAttribute("data-tooltip-content", isVideoPaused ? "Pause (k)" : "Play (k)");
            }

            // fast_rewind video function
            fast_rewind.addEventListener("click", () => {
                skip(-10)
            });

            // fast_forward video function
            fast_forward.addEventListener("click", () => {
                skip(10)
            });

            function skip(duration) {
                mainVideo.currentTime += duration
            }

            // Load video duration
            mainVideo.addEventListener("loadeddata", (e) => {
                let videoDuration = e.target.duration;
                let totalMin = Math.floor(videoDuration / 60);
                let totalSec = Math.floor(videoDuration % 60);

                // if seconds are less then 10 then add 0 at the begning
                totalSec < 10 ? (totalSec = "0" + totalSec) : totalSec;
                totalDuration.innerHTML = `${totalMin} : ${totalSec}`;
            });

            // Current video duration
            mainVideo.addEventListener("timeupdate", (e) => {
                let currentVideoTime = e.target.currentTime;
                let currentMin = Math.floor(currentVideoTime / 60);
                let currentSec = Math.floor(currentVideoTime % 60);
                // if seconds are less then 10 then add 0 at the begning
                currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
                current.innerHTML = `${currentMin} : ${currentSec}`;

                let videoDuration = e.target.duration;
                // progressBar width change
                let progressWidth = (currentVideoTime / videoDuration) * 100 + 0.5;
                progress_Bar.style.width = `${progressWidth}%`;
            });

            // let's update playing video current time on according to the progress bar width

            progressArea.addEventListener("pointerdown", (e) => {
                progressArea.setPointerCapture(e.pointerId);
                setTimelinePosition(e);
                progressArea.addEventListener("pointermove", setTimelinePosition);
                progressArea.addEventListener("pointerup", () => {
                    progressArea.removeEventListener("pointermove", setTimelinePosition);
                })
            });


            function setTimelinePosition(e) {
                let videoDuration = mainVideo.duration;
                let progressWidthval = progressArea.clientWidth + 2;
                let ClickOffsetX = e.offsetX;
                mainVideo.currentTime = (ClickOffsetX / progressWidthval) * videoDuration;

                let progressWidth = (mainVideo.currentTime / videoDuration) * 100 + 0.5;
                progress_Bar.style.width = `${progressWidth}%`;

                let currentVideoTime = mainVideo.currentTime;
                let currentMin = Math.floor(currentVideoTime / 60);
                let currentSec = Math.floor(currentVideoTime % 60);
                // if seconds are less then 10 then add 0 at the begning
                currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
                current.innerHTML = `${currentMin} : ${currentSec}`;

            }

            function drawProgress(canvas, buffered, duration) {
                let context = canvas.getContext('2d', { antialias: false });
                context.fillStyle = "#ffffffe6";

                let height = canvas.height;
                let width = canvas.width;
                if (!height || !width) throw "Canva's width or height or not set.";
                context.clearRect(0, 0, width, height);
                for (let i = 0; i < buffered.length; i++) {
                    let leadingEdge = buffered.start(i) / duration * width;
                    let trailingEdge = buffered.end(i) / duration * width;
                    context.fillRect(leadingEdge, 0, trailingEdge - leadingEdge, height)
                }
            }

            mainVideo.addEventListener('progress', () => {
                drawProgress(bufferedBar, mainVideo.buffered, mainVideo.duration);
            })

            mainVideo.addEventListener('waiting', () => {
                loader.style.display = "block";
            })

            mainVideo.addEventListener('canplay', () => {
                loader.style.display = "none";
            })


            // change volume
            function changeVolume() {
                mainVideo.volume = volume_range.value / 100;
                if (volume_range.value == 0) {
                    volume.innerHTML = "volume_off";
                } else if (volume_range.value < 40) {
                    volume.innerHTML = "volume_down";
                } else {
                    volume.innerHTML = "volume_up";
                }
            }

            function toggleMute() {
                if (volume_range.value == 0) {
                    volume_range.value = 100;
                    mainVideo.volume = 1;
                    volume.innerHTML = "volume_up";
                } else {
                    volume_range.value = 0;
                    mainVideo.volume = 0;
                    volume.innerHTML = "volume_off";
                }
            }

            function toggleVolumeToolTip() {
                if (volume.innerHTML === "volume_off") {
                    volume.setAttribute("data-tooltip-id", "control-tooltip");
                    volume.setAttribute("data-tooltip-content", "Unmute (m)");
                } else if (volume.innerHTML === "volume_up") {
                    volume.setAttribute("data-tooltip-id", "control-tooltip");
                    volume.setAttribute("data-tooltip-content", "Mute (m)");
                } else {
                    volume.setAttribute("data-tooltip-id", "control-tooltip");
                    volume.setAttribute("data-tooltip-content", "Mute (m)");
                }
            }

            volume_range.addEventListener("input", () => {
                changeVolume();
                toggleVolumeToolTip()
            });

            volume.addEventListener("click", () => {
                toggleMute();
                toggleVolumeToolTip()
            });

            // Update progress area time and display block on mouse move
            progressArea.addEventListener("mousemove", (e) => {
                let progressWidthval = progressArea.clientWidth + 2;
                let x = e.offsetX;
                let videoDuration = mainVideo.duration;
                let progressTime = Math.floor((x / progressWidthval) * videoDuration);
                let currentMin = Math.floor(progressTime / 60);
                let currentSec = Math.floor(progressTime % 60);
                progressAreaTime.style.setProperty("--x", `${x}px`);
                progressAreaTime.style.display = "block";
                if (x >= progressWidthval - 80) {
                    x = progressWidthval - 80;
                } else if (x <= 75) {
                    x = 75;
                } else {
                    x = e.offsetX;
                }

                // if seconds are less then 10 then add 0 at the begning
                currentSec < 10 ? (currentSec = "0" + currentSec) : currentSec;
                progressAreaTime.innerHTML = `${currentMin} : ${currentSec}`;
                // If you want to show your video thumbnail on progress Bar hover then comment out the following code. Make sure that you are using video from same domain where you hosted your webpage.

                thumbnail.style.setProperty("--x", `${x}px`);
                thumbnail.style.display = "none";

                // for (var item of thumbnails) {
                //   //
                //   var data = item.sec.find(x1 => x1.index === Math.floor(progressTime));

                //   // thumbnail found
                //   if (data) {
                //     if (item.data != undefined) {
                //       thumbnail.setAttribute("style", `background-image: url(${item.data});background-position-x: ${data.backgroundPositionX}px;background-position-y: ${data.backgroundPositionY}px;--x: ${x}px;display: block;`)
                //       return;
                //     }
                //   }
                // }

                const rect = progressArea.getBoundingClientRect()
                const percent = Math.min(Math.max(0, e.x - rect.x), rect.width) / rect.width
                const previewImgNumber = Math.max(1, Math.floor((percent * mainVideo.duration) / 1))
                const previewImgSrc = `/assets/images/test/preview/preview${previewImgNumber}.jpg`
                thumbnail.src = previewImgSrc
                thumbnail.style.border = "1px solid orange"
                thumbnail.style.width = "200px"
                thumbnail.style.aspectRatio = "16 / 9"
                thumbnail.style.zIndex = "9999"
                thumbnail.style.marginBottom = "2rem"
                // thumbnail.setAttribute("style", `background-position-x: ${backgroundPositionX}px;background-position-y: ${backgroundPositionY}px;--x: ${x}px;display: block;`)
            });

            progressArea.addEventListener("mouseleave", () => {
                // If you want to show your video thumbnail on progress Bar hover then comment out the following code. Make sure that you are using video from same domain where you hosted your webpage.

                thumbnail.style.display = "none";
                progressAreaTime.style.display = "none";
            });

            // Auto play
            auto_play.addEventListener("click", () => {
                toggleAutoPlay()
                toggleAutoPLayToolTip()
            });

            function toggleAutoPlay() {
                auto_play.classList.toggle("active");
            }

            function toggleAutoPLayToolTip() {
                if (auto_play.classList.contains("active")) {
                    auto_play.setAttribute("data-tooltip-id", "control-tooltip");
                    auto_play.setAttribute("data-tooltip-content", "Autoplay is on (a)");
                } else {
                    auto_play.setAttribute("data-tooltip-id", "control-tooltip");
                    auto_play.setAttribute("data-tooltip-content", "Autoplay is off (a)");
                }
            }

            mainVideo.addEventListener("ended", () => {
                if (auto_play.classList.contains("active")) {
                    playNextVideo()
                } else {
                    play_pause.innerHTML = "replay";


                    play_pause.setAttribute("data-tooltip-id", "control-tooltip");
                    play_pause.setAttribute("data-tooltip-content", "Replay (k)");
                }
            });

            // Picture in picture
            picture_in_picutre.addEventListener("click", () => {
                toggleMiniPlayerMode()
            });

            function toggleMiniPlayerMode() {
                if (mainVideo && typeof mainVideo.requestPictureInPicture === "function") {
                    // Check if the video is playing
                    if (video_player.classList.contains("mini-player")) {
                        document.exitPictureInPicture()
                            .then(() => {
                                // PiP mode entered successfully
                                console.log("Entered Picture-in-Picture mode.");
                            })
                            .catch((error) => {
                                // Handle any errors
                                console.error("Failed to enter Picture-in-Picture mode:", error);
                            });
                    } else {
                        mainVideo.requestPictureInPicture()
                    }
                }
            }

            mainVideo.addEventListener("enterpictureinpicture", () => {
                video_player.classList.add("mini-player")
                tooglePiPToolTip()
            })

            mainVideo.addEventListener("leavepictureinpicture", () => {
                video_player.classList.remove("mini-player")
                tooglePiPToolTip()
            })

            function tooglePiPToolTip() {
                if (video_player.classList.contains("mini-player")) {
                    picture_in_picutre.setAttribute("data-tooltip-id", "control-tooltip");
                    picture_in_picutre.setAttribute("data-tooltip-content", "Exit Picture in Picture (i)");
                } else {
                    picture_in_picutre.setAttribute("data-tooltip-id", "control-tooltip");
                    picture_in_picutre.setAttribute("data-tooltip-content", "Enter Picture in Picture (i)");
                }
            }

            // Full screen function
            fullscreen.addEventListener("click", () => {
                toggleFullScreenMode();
                toggleFullScreenToolTip();
            });

            document.addEventListener("fullscreenchange", () => {
                handleVisibilityAndCursor()

                if (document.fullscreenElement) {
                    fullscreen.innerHTML = "fullscreen_exit"
                } else if (!document.fullscreenElement) {
                    fullscreen.innerHTML = "fullscreen"
                }

                const tooltipText = fullscreen.innerHTML === "fullscreen" ? "Enter Fullscreen (f)" : "Exit Fullscreen (f)";
                fullscreen.setAttribute("data-tooltip-id", "control-tooltip");
                fullscreen.setAttribute("data-tooltip-content", tooltipText);
            })

            function toggleFullScreenMode() {
                if (!document.fullscreenElement) {
                    if (video_player.requestFullscreen) {
                        video_player.requestFullscreen();
                    } else if (video_player.mozRequestFullScreen) { // Firefox
                        video_player.mozRequestFullScreen();
                    } else if (video_player.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                        video_player.webkitRequestFullscreen();
                    }
                    fullscreen.innerHTML = "fullscreen_exit";
                } else if (document.fullscreenElement) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.mozCancelFullScreen) { // Firefox
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) { // Chrome, Safari, and Opera
                        document.webkitExitFullscreen();
                    }
                    fullscreen.innerHTML = "fullscreen";
                }
            }

            function toggleFullScreenToolTip() {
                const tooltipText = fullscreen.innerHTML === "fullscreen" ? "Enter Fullscreen (f)" : "Exit Fullscreen (f)";
                fullscreen.setAttribute("data-tooltip-id", "control-tooltip");
                fullscreen.setAttribute("data-tooltip-content", tooltipText);
            }

            // Open settings
            settingsBtn.addEventListener("click", () => {
                settings.classList.toggle("active");
                settingsBtn.classList.toggle("active");
                if (
                    captionsBtn.classList.contains("active") ||
                    captions.classList.contains("active")
                ) {
                    captions.classList.remove("active");
                    captionsBtn.classList.remove("active");
                }
            });
            // Open caption
            captionsBtn.addEventListener("click", () => {
                captions.classList.toggle("active");
                captionsBtn.classList.toggle("active");
                if (
                    settingsBtn.classList.contains("active") ||
                    settings.classList.contains("active")
                ) {
                    settings.classList.remove("active");
                    settingsBtn.classList.remove("active");
                }
            });

            // Playback Rate

            playback.forEach((event) => {
                event.addEventListener("click", () => {
                    removeActiveClasses(playback);
                    event.classList.add("active");
                    let speed = event.getAttribute("data-speed");
                    mainVideo.playbackRate = speed;
                });
            });

            caption.forEach((event) => {
                event.addEventListener("click", () => {
                    removeActiveClasses(caption);
                    event.classList.add("active");
                    changeCaption(event);
                    caption_text.innerHTML = "";
                });
            });

            let track = mainVideo.textTracks;

            function changeCaption(lable) {
                let trackLable = lable.getAttribute("data-track");
                for (let i = 0; i < track.length; i++) {
                    track[i].mode = "disabled";
                    if (track[i].label == trackLable) {
                        track[i].mode = "showing";
                    }
                }
            }

            const settingDivs = video_player.querySelectorAll('.settings > div');
            const settingBack = video_player.querySelectorAll('.settings > div .back_arrow');
            const quality_ul = video_player.querySelector(".settings > [data-label='quality'] ul");
            const qualities = video_player.querySelectorAll("source[size]");

            qualities.forEach(event => {
                let quality_html = `<li target="controls" data-quality="${event.getAttribute('size')}">${event.getAttribute('size')}p</li>`;
                quality_ul.insertAdjacentHTML('afterbegin', quality_html);
            })

            const quality_li = video_player.querySelectorAll(".settings > [data-label='quality'] ul > li");
            quality_li.forEach((event) => {
                event.addEventListener('click', (e) => {
                    let quality = event.getAttribute('data-quality');
                    removeActiveClasses(quality_li);
                    event.classList.add('active');
                    qualities.forEach(event => {
                        if (event.getAttribute('size') == quality) {
                            let video_current_duration = mainVideo.currentTime;
                            let video_source = event.getAttribute('src');
                            mainVideo.src = video_source;
                            mainVideo.currentTime = video_current_duration;
                            playVideo();
                        }
                    })
                })
            })

            settingBack.forEach((event) => {
                event.addEventListener('click', (e) => {
                    let setting_label = e.target.getAttribute('data-label');
                    for (let i = 0; i < settingDivs.length; i++) {
                        if (settingDivs[i].getAttribute('data-label') == setting_label) {
                            settingDivs[i].removeAttribute('hidden');
                        } else {
                            settingDivs[i].setAttribute('hidden', "");
                        }
                    }
                })
            })

            settingHome.forEach((event) => {
                event.addEventListener('click', (e) => {
                    let setting_label = e.target.getAttribute('data-label');
                    for (let i = 0; i < settingDivs.length; i++) {
                        if (settingDivs[i].getAttribute('data-label') == setting_label) {
                            settingDivs[i].removeAttribute('hidden');
                        } else {
                            settingDivs[i].setAttribute('hidden', "");
                        }
                    }
                })
            })


            function removeActiveClasses(e) {
                e.forEach((event) => {
                    event.classList.remove("active");
                });
            }

            let caption_text = video_player.querySelector(".caption_text");
            for (let i = 0; i < track.length; i++) {
                track[i].addEventListener("cuechange", () => {
                    if (track[i].mode === "showing") {
                        if (track[i].activeCues[0]) {
                            let span = `<span target="controls"><mark target="controls">${track[i].activeCues[0].text}</mark></span>`;
                            caption_text.innerHTML = span;
                        } else {
                            caption_text.innerHTML = "";
                        }
                    }
                });
            }

            //  blob url
            let mainVideoSources = mainVideo.querySelectorAll("source");
            for (let i = 0; i < mainVideoSources.length; i++) {
                let videoUrl = mainVideoSources[i].src;
                blobUrl(mainVideoSources[i], videoUrl);
            }
            function blobUrl(video, videoUrl) {
                let xhr = new XMLHttpRequest();
                xhr.open("GET", videoUrl);
                xhr.responseType = "arraybuffer";
                xhr.onload = (e) => {
                    let blob = new Blob([xhr.response]);
                    let url = URL.createObjectURL(blob);
                    video.src = url;
                };
                xhr.send();
            }

            // video_player.addEventListener("contextmenu", (e) => {
            //     e.preventDefault();
            // });

            // Mouse move controls
            let timer;

            function handleVisibilityAndCursor() {
                if (mainVideo.paused) return;

                timer = setTimeout(() => {
                    if (settingsBtn.classList.contains("active") || captionsBtn.classList.contains("active")) {
                        controls.classList.add("active");
                    } else {
                        controls.classList.remove("active");
                        if (tracks.length != 0) {
                            caption_text.classList.add("active");
                        }
                    }
                }, 3000);
            };

            handleVisibilityAndCursor();

            video_player.addEventListener("mousemove", () => {
                controls.classList.add("active");
                if (tracks.length != 0) {
                    caption_text.classList.remove("active");
                }
                clearTimeout(timer);
                handleVisibilityAndCursor();
            });
            if (tracks.length == 0) {
                caption_labels.remove();
                captions.remove();
                captionsBtn.parentNode.remove();
            }

            // Create a MutationObserver instance
            const observer = new MutationObserver((mutationsList, observer) => {

                // Handle changes to the classList for the controls element
                if (mutationsList.some(mutation => mutation.target === controls)) {
                    const isActive = controls.classList.contains('active');
                    const isFullScreen = document.fullscreenElement !== null

                    if (isFullScreen) {
                        if (isActive) {
                            mainVideo.style.cursor = "auto";
                        } else {
                            mainVideo.style.cursor = "none";
                        }
                    } else {
                        mainVideo.style.cursor = "auto";
                    }
                }
            });

            // Configure and start observing
            const config = { attributes: true, attributeFilter: ['class'] };
            observer.observe(controls, config);

            mainVideo.addEventListener("ended", () => {
                controls.classList.add("active");
            });

            function playNextVideo() {
                //     nextVideoLinks.forEach(function(nextVideoLink) {
                //         console.log(nextVideoLinks.href)
                //     })
            }

            // If you want to show your video thumbnail on progress Bar hover then comment out the following code. Make sure that you are using video from same domain where you hosted your webpage.

            // var thumbnails = [];
            // var thumbnailWidth = 158;
            // var thumbnailHeight = 90;
            // var horizontalItemCount = 5;
            // var verticalItemCount = 5;

            // let preview_video = document.createElement('video')
            // preview_video.preload = "metadata";
            // preview_video.width = "500";
            // preview_video.height = "300"
            // preview_video.controls = true;
            // preview_video.src = mainVideo.querySelector("source").src;
            // preview_video.addEventListener("loadeddata", async function () {
            // preview_video.pause();

            //   var count = 1;
            //   var id = 1;
            //   var x = 0,
            //   y = 0;

            //   var array = [];

            //   var duration = parseInt(preview_video.duration);
            //   for (var i = 1; i <= duration; i++) {
            //     array.push(i);
            //   }

            //   var canvas;

            //   var i, j;

            //   for (i = 0, j = array.length; i < j; i += horizontalItemCount) {
            //     for (var startIndex of array.slice(i, i + horizontalItemCount)) {
            //       var backgroundPositionX = x * thumbnailWidth;
            //       var backgroundPositionY = y * thumbnailHeight;
            //       var item = thumbnails.find((x) => x.id === id);

            //       if (!item) {
            //         canvas = document.createElement("canvas");
            //         canvas.width = thumbnailWidth * horizontalItemCount;
            //         canvas.height = thumbnailHeight * verticalItemCount;
            //         thumbnails.push({
            //           id: id,
            //           canvas: canvas,
            //           sec: [
            //             {
            //               index: startIndex,
            //               backgroundPositionX: -backgroundPositionX,
            //               backgroundPositionY: -backgroundPositionY,
            //             },
            //           ],
            //         });
            //       } else {
            //         canvas = item.canvas;
            //         item.sec.push({
            //           index: startIndex,
            //           backgroundPositionX: -backgroundPositionX,
            //           backgroundPositionY: -backgroundPositionY,
            //         });
            //       }
            //       var context = canvas.getContext("2d");
            //       preview_video.currentTime = startIndex;
            //       await new Promise(function (resolve) {
            //         var event = function () {
            //           context.drawImage(
            //             preview_video,
            //             backgroundPositionX,
            //             backgroundPositionY,
            //             thumbnailWidth,
            //             thumbnailHeight
            //           );
            //           x++;

            //           // removing duplicate events
            //           preview_video.removeEventListener("canplay", event);
            //           resolve();
            //         };
            //         preview_video.addEventListener("canplay", event);
            //       });

            //       // 1 thumbnail is generated completely
            //       count++;
            //     }

            //     // reset x coordinate
            //     x = 0;

            //     // increase y coordinate
            //     y++;

            //     // checking for overflow
            //     if (count > horizontalItemCount * verticalItemCount) {
            //       count = 1;
            //       x = 0;
            //       y = 0;
            //       id++;
            //     }
            //   }
            //   // looping through thumbnail list to update thumbnail
            //   thumbnails.forEach(function (item) {
            //     // converting canvas to blob to get short url
            //     item.canvas.toBlob((blob) => (item.data = URL.createObjectURL(blob)), "image/jpeg");
            //     // deleting unused property
            //     delete item.canvas;
            //   });
            // });

        });

    }, [])

    const [isPaused, setIsPaused] = useState(false);
    // const [isFullScreen, setIsFullScreen] = useState(false);

    useEffect(() => {
        const video = document.querySelector('video');

        function updateTextElement() {
            // const isPaused = video.paused ? "Pause" : "Play";
            setIsPaused(video.paused);
        }

        video.addEventListener("play", () => {
            updateTextElement()
        })
        video.addEventListener("pause", () => {
            updateTextElement()
        })

    }, []);

    const togglePlayPause = () => {
        const video = document.querySelector('video');
        if (isPaused) {
            video.play();
        } else {
            video.pause();
        }
    };

    async function copyToClipboard() {
        await navigator.clipboard.writeText(location.href)
    };

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if it's a mobile device and set the state accordingly
        setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
    }, []);

    return (
        <section target="controls" className='section'>
            <div target="controls" className="container">
                <ContextMenu>
                    <ContextMenuTrigger className="w-full">
                        <div target="controls" className="video_player w-full">
                            <div target="controls" className='loader'><LoadingComponent size="large" /></div>

                            <video target="controls" controls={controls} autoPlay={autoplay} id={id} preload="metadata" className="main-video">

                                {sources?.map((item, index) => {
                                    const quality = Object.keys(item)[0]; // Get the quality (e.g., '1080' or '720')
                                    const src = item[quality]; // Get the source URL
                                    {/* console.log(src) */ }
                                    return (
                                        <source target="controls" key={index} src={`${src}`} id={quality + 'p'} size={quality} type='video/mp4' />
                                    );
                                })}

                                {/* {track.map((item, index) => {
                            const label = Object.keys(item)[0]; // Get the label (e.g., 'en' or 'jp')
                            const src = item[label]; // Get the source URL
                            return (
                                <track label={label} kind="subtitles" src={src} srclang={src} key={index} id={label + '-caption'} />
                            );
                        })} */}

                            </video>

                            {!isMobile ? (
                                <Tooltip style={{ zIndex: '999999999999' }} id="control-tooltip" />
                            ) : null}
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                        <ContextMenuItem>Aniflex player 1.3</ContextMenuItem>
                        <ContextMenuItem onClick={togglePlayPause}>{isPaused ? "Play" : "Pause"}</ContextMenuItem>
                        <ContextMenuItem onClick={copyToClipboard}>Copy Link</ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>


            </div>

            <div target="controls">
                <h5 target="controls" className='pt-8'>{Title}</h5>
            </div>

        </section>
    )
}


export function SuggesstionContainer({ containerClassList, key, containerStyle, children, linkHref, linkClassList, linkStyle }) {

    return (
        <div className={containerClassList} key={key} id={key} style={containerStyle}>
            <Link href={linkHref} style={linkStyle} className={`${linkClassList} nextVideoLink`}>
                {children}
            </Link>
        </div>
    )
}
