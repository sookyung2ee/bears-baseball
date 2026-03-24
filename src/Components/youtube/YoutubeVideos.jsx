import React, { useEffect, useRef, useState } from "react";
import styles from "./YoutubeVideos.module.css";
import { fetchYoutubeVideos } from "../../api/youtube";
import data from "../../../public/data/youtube.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

export default function YoutubeVideos() {
  const [videos, setVideos] = useState([]);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    fetchYoutubeVideos().then(setVideos);
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let totalMove = 0;

    const mouseDown = (e) => {
      isDragging.current = false;
      totalMove = 0;
      isDown = true;
      slider.style.cursor = "grabbing";
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const mouseLeave = () => {
      isDown = false;
      slider.style.cursor = "grab";
    };

    const mouseUp = () => {
      isDown = false;
      slider.style.cursor = "grab";
    };

    const mouseMove = (e) => {
      if (!isDown) return;
      totalMove += Math.abs(e.movementX);
      if (totalMove > 1) {
        isDragging.current = true;
      }
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener("mousedown", mouseDown);
    slider.addEventListener("mouseleave", mouseLeave);
    window.addEventListener("mouseup", mouseUp);
    slider.addEventListener("mousemove", mouseMove);

    return () => {
      slider.removeEventListener("mousedown", mouseDown);
      slider.removeEventListener("mouseleave", mouseLeave);
      window.removeEventListener("mouseup", mouseUp);
      slider.removeEventListener("mousemove", mouseMove);
    };
  }, [videos]);

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        <span className={styles.iconWrapper}>
          <FontAwesomeIcon icon={faYoutube} className={styles.icon} />
        </span>
        <span>BEARS TV</span>
      </p>
      <div ref={sliderRef} className={styles.videos}>
        {videos.map((video) => {
          const thumbnailUrl = video.snippet.thumbnails.high.url;
          return (
            <div
              key={video.id.videoId}
              className={styles.videoCard}
              draggable="false"
              onClick={() => {
                if (!isDragging.current) {
                  window.open(
                    `https://www.youtube.com/watch?v=${video.id.videoId}`,
                    "_blank",
                  );
                }
              }}
            >
              <div className={styles.thumbnailBox}>
                <img
                  src={thumbnailUrl}
                  alt={video.snippet.title}
                  draggable="false"
                />
              </div>
              <p className={styles.videoTitle}>{video.snippet.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
