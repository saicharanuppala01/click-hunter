import { useState, useEffect } from "react";
import "./App.css";

import ScoreBoard from "./components/ScoreBoard";
import Settings from "./components/Settings";
import GameArea from "./components/GameArea";

function App() {

  const [score, setScore] = useState(0);
  const [level,setLevel] = useState(1);
  const playSound = () => {
    const audio = new Audio("/click.mp3");
    audio.play();
  };
  const [timeLeft, setTimeLeft] =
    useState(60);

  const [gameStarted, setGameStarted] =
    useState(false);

  const [circleColor, setCircleColor] =
    useState("#00E5FF");

  const [circlePosition, setCirclePosition] =
    useState({
      x: 200,
      y: 200
    });

  const [circleSize,setCircleSize] =
    useState(100);

  const [highScore,setHighScore] =
    useState(Number(localStorage.getItem("highScore")) || 0);

  const moveCircle = () => {
    const gameWidth =
      window.innerWidth - circleSize;
    const gameHeight =
      window.innerHeight * 0.75 - circleSize;
    setCirclePosition({
      x: Math.random() * gameWidth,
      y: Math.random() * gameHeight
    });
  };

  const handleCircleClick = () => {
    playSound();
    setScore(prev => prev + 1);
    moveCircle();
  };

  const handleMissClick = () => {
    setScore(prev =>
      Math.max(0, prev - 5)
    );
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameStarted(true);
    moveCircle();
    setLevel(1);
    setCircleSize(100);
  };

  useEffect(() => {
    if (!gameStarted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameStarted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameStarted]);

  useEffect(() => {

    if (!gameStarted) return;

    const autoMove = setInterval(() => {
      moveCircle();
    }, 4500);

    return () =>
      clearInterval(autoMove);

  }, [gameStarted]);

  useEffect(()=>{
    if(score>highScore){
      setHighScore(score);
      localStorage.setItem('highScore',score);
    }
  },[score,highScore]);

  return (
    <div className="app">

      <Settings
        circleColor={circleColor}
        setCircleColor={setCircleColor}
        startGame={startGame}
      />

      <ScoreBoard
        score={score}
        highScore={highScore}
        timeLeft={timeLeft}
      />

      {gameStarted && (
        <GameArea
          circlePosition={circlePosition}
          circleSize={circleSize}
          circleColor={circleColor}
          handleCircleClick={handleCircleClick}
          handleMissClick={handleMissClick}
        />
      )}

      {!gameStarted && timeLeft === 0 && (
        <div style={{
          marginTop: "50px"
        }}>
          <h1>GAME OVER</h1>
          <h2>Final Score: {score}</h2>
          <h2>High Score: {highScore}</h2> 
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;