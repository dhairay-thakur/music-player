import React from "react";

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
    const newSongs = songs.map((song) => {
      if (song.id === currentSong.id) {
        return { ...song, active: true };
      } else {
        return { ...song, active: false };
      }
    });
    setSongs(newSongs);

    // play the clicked song
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          audioRef.current.play();
        });
      }
    }
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
