import React, {useState, useRef, useEffect} from 'react';
import '../../css/Timer.css';

export default function Timer() {
    const [interval, setInterval] = useState(1)
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(60)
    const cancelTime = useRef()

    const displayTimes = () => {
        const intervals = [1, 2, 3, 4, 5, 10, 15, 20, 25, 30, 45, 60];
        return(
            <>
            {intervals.map(interval => <option key={interval} val={interval}>{interval}</option>)}
            </>
        )
    }



    const updateTime = (e) => {
         setInterval(e.target.value)
        //  if(!isCountingDown) {
            setTimeRemaining(e.target.value * 60)
        //  }
    }
    const togglePause = () => {
        if(!isPaused) {
            clearInterval(cancelTime.current)
        } else {
            startTime()
        }
         setIsPaused(prevPause => !prevPause)
    }
  
    const startTime = (e) => {
        setIsCountingDown(true);
        cancelTime.current = window.setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 1); 
        }, 1000)
    }

    const stopTime = (e) => {
        setIsCountingDown(false);
        setIsPaused(false);
        clearInterval(cancelTime.current)
        setTimeRemaining(interval * 60)
    }

    const divStyle = {
        backgroundImage: "linear-gradient(to left, white " + (timeRemaining / (interval * 60)) * 100 + "%, #EBFF00 " + 0 + "%)"
    };

    console.log(divStyle)

    if(isCountingDown || isPaused) {
        return(
            <div className="timerContainer" style={{backgroundImage: divStyle.backgroundImage}} >
                <div>{timeRemaining}</div>
                <button onClick={stopTime}>Stop</button>   
                <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button> 
            </div>
        )
    } 
    return(
        <div className="timerContainer" style={{backgroundImage: divStyle.backgroundImage}}>
            <label>Select Time: </label>
            <select value={interval} onChange={updateTime}>
                {displayTimes()}
            </select>

             <button onClick={startTime}>Start</button> 
        </div>
    )
};

