import React, { useState, useRef, useEffect } from "react";
import "./Timer.css";
import alertSound from "../../assets/alarm.mp3";


export default function Timer() {
  const [interval, setInterval] = useState(15);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(900);
  const cancelTime = useRef<undefined | number>();

  const displayTimes = () => {
    const intervals = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 60];
    return (
      <>
        {intervals.map((interval) => (
          <option
            key={interval}
            value={interval}
            data-testid="timeIntervalOptions"
          >
            {interval}
          </option>
        ))}
      </>
    );
  };

  useEffect(() => {
    return () => {
      clearInterval(cancelTime.current);
    };
  }, []);

  const updateTime = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInterval(Number(e.target.value));
    setTimeRemaining(Number(e.target.value) * 60);
  };
  const togglePause = () => {
    if (!isPaused) {
      clearInterval(cancelTime.current);
    } else {
      startTime();
    }
    setIsPaused((prevPause) => !prevPause);
  };

  const startTime = () => {
    setIsCountingDown(true);
    cancelTime.current = window.setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
  };

  const stopTime = () => {
    setIsCountingDown(false);
    setIsPaused(false);
    clearInterval(cancelTime.current);
    setTimeRemaining(interval * 60);
  };

  let divStyle = {
    backgroundImage:
      "linear-gradient(to left, white " +
      (timeRemaining / (interval * 60)) * 100 +
      "%, #EBFF00 " +
      0 +
      "%)",
  };

  if (timeRemaining === 0) {
    stopTime();
    let src = alertSound;
    let audio = new Audio(src);
    audio.play();
  }

  if (isCountingDown || isPaused) {
    return (
      <div
        className="timerContainer"
        style={{ backgroundImage: divStyle.backgroundImage }}
      >
        <div>{timeRemaining}</div>
        <button onClick={stopTime}>Stop</button>
        <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button>
      </div>
    );
  }
  return (
    <div
      className="timerContainer"
      style={{ backgroundImage: divStyle.backgroundImage }}
    >
      <label>Select Time: </label>
      <select value={interval} onChange={updateTime} data-testid="timerSelect">
        {displayTimes()}
      </select>

      <button onClick={startTime}>Start</button>
    </div>
  );
}
