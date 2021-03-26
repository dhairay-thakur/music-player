import React from "react";

const Song = ({ currentSong, libOpen }) => {
  return (
    <div className={`song-container ${libOpen ? "library-open" : ""}`}>
      <img src={currentSong.cover} alt={currentSong.name} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};

export default Song;
