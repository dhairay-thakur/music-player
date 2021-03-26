import React from "react";

import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libOpen,
}) => {
  return (
    <div className={`library ${libOpen ? "active" : ""}`}>
      <h2>Library</h2>
      <div>
        {songs.map((song) => (
          <LibrarySong
            currentSong={song}
            setCurrentSong={setCurrentSong}
            key={song.id}
            audioRef={audioRef}
            isPlaying={isPlaying}
            songs={songs}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
