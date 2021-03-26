import React from "react";
import { playAudio, changeActiveSong } from "../util";

const LibrarySong = ({
  currentSong,
  setCurrentSong,
  audioRef,
  isPlaying,
  songs,
  setSongs,
}) => {
  const songClickHandler = async () => {
    // sets the playing song to selected song
    setCurrentSong(currentSong);

    // changes the 'active' property of current song to true and that of others to false
    changeActiveSong(songs, setSongs, currentSong);

    // play the clicked song
    playAudio(isPlaying, audioRef);
  };

  return (
    <div
      className={`library-song ${currentSong.active ? "selected" : ""}`}
      onClick={songClickHandler}
    >
      <img src={currentSong.cover} alt={currentSong.name} />
      <div className="song-description">
        <h3>{currentSong.name}</h3>
        <h4>{currentSong.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;
