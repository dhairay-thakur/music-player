import React, { useRef, useState } from "react";
import {
  faAngleLeft,
  faAngleRight,
  faPlay,
  faPause,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
  const audioRef = useRef(null);
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

  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: null,
  });

  const timeFormat = (time) =>
    Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };

  const timeUpdateHandler = (e) => {
    // console.log(e.target.duration)
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
    });
  };

  return (
    <div className="player">
      <div className="time-control">
        <p>{timeFormat(songInfo.currentTime)}</p>
        <input
          onChange={dragHandler}
          min={0}
          max={songInfo.duration}
          type="range"
          value={songInfo.currentTime}
        />
        <p>{timeFormat(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon className="skip-back" icon={faAngleLeft} size="2x" />
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
        />
      </div>
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
      ></audio>
    </div>
  );
};

export default Player;
