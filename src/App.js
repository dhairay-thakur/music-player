import React, { useState, useRef } from "react";
import Player from "./components/Player";
import Song from "./components/Song";
import Library from "./components/Library";
import Nav from "./components/Nav";
import data from "./data";
import "./styles/app.scss";

const App = () => {
  const audioRef = useRef(null);
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animation: 0,
  });
  const [libOpen, setLibOpen] = useState(false);

  const timeUpdateHandler = (e) => {
    // console.log(e.target.duration)
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const animation = Math.round((currentTime / duration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animation,
    });
  };

  const songEndHandler = async () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className="App" style={{ backgroundColor: currentSong.color[1] }}>
      <Nav libOpen={libOpen} setLibOpen={setLibOpen} />
      <Song libOpen={libOpen} currentSong={currentSong} />
      <Player
        libOpen={libOpen}
        setSongs={setSongs}
        setCurrentSong={setCurrentSong}
        songs={songs}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
      />
      <Library
        libOpen={libOpen}
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        onLoadedMetadata={timeUpdateHandler}
        onTimeUpdate={timeUpdateHandler}
        ref={audioRef}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
};

export default App;
