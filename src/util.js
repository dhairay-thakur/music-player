export const playAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        audioRef.current.play();
      });
    }
  }
};

export const changeActiveSong = (songs, setSongs, currentSong) => {
  const newSongs = songs.map((song) => {
    if (song.id === currentSong.id) {
      return { ...song, active: true };
    } else {
      return { ...song, active: false };
    }
  });
  setSongs(newSongs);
};
