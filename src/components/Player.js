import React from "react";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { changeActiveSong } from "../util";

const Player = ({
  currentSong,
  libOpen,
  isPlaying,
  setIsPlaying,
  audioRef,
  songInfo,
  setSongInfo,
  songs,
  setCurrentSong,
  setSongs,
}) => {
  // Event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const timeFormat = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const skipTrackHandler = async (direction) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let newSong;
    if (direction === "next") {
      newSong = songs[(currentIndex + 1) % songs.length];
    } else {
      newSong = songs[(currentIndex - 1 + songs.length) % songs.length];
    }
    await setCurrentSong(newSong);
    changeActiveSong(songs, setSongs, newSong);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`player ${libOpen ? "library-open" : ""}`}>
      <div className="time-control">
        <p>{timeFormat(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: currentSong.color[0],
          }}
        >
          <input
            onChange={dragHandler}
            min={0}
            max={songInfo.duration || 0}
            type="range"
            value={songInfo.currentTime}
          />
          <div
            style={{ transform: `translateX(${songInfo.animation}%)` }}
            className="animate-track"
          ></div>
        </div>
        <p>{timeFormat(songInfo.duration || 0)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
          onClick={() => skipTrackHandler("previous")}
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={!isPlaying ? faPlay : faPause}
          size="2x"
        />
        <FontAwesomeIcon
          className="skip-forwards"
          icon={faAngleRight}
          size="2x"
          onClick={() => skipTrackHandler("next")}
        />
      </div>
    </div>
  );
};

export default Player;
