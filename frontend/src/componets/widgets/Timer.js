import React, {useState, useRef, useEffect} from 'react'

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

    useEffect(() => {
        console.log("useeffect")
        if(isCountingDown) {
            cancelTime.current = setInterval(() => {
                setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 1)
            }, 1000)
        }
    }, [isCountingDown, isPaused])

    const updateTime = (e) => {
         setInterval(e.target.value)
         if(!isCountingDown) {
            setTimeRemaining(e.target.value * 60)
         }
    }
    const togglePause = () => {
        // if(!isPaused) {
        //     clearInterval(cancelTime.current)
        // }
        //  setIsPaused(prevPause => !prevPause)
    }

    const startTime = (e) => {
        setIsCountingDown(true);
    }

    const stopTime = (e) => {
        setIsCountingDown(false);
        clearInterval(cancelTime.current)
        setTimeRemaining(interval)
    }

    console.log("interval", interval)
    console.log("isCountingDown", isCountingDown)
    console.log("paused", isPaused)
    console.log("timeRemaing", timeRemaining)
    console.log("cancel", cancelTime.current)

    if(isCountingDown || isPaused) {
        return(
            <div>
                <div>{timeRemaining}</div>
                <button onClick={stopTime}>Stop</button>   
                <button onClick={togglePause}>{isPaused ? "Resume" : "Pause"}</button> 
            </div>
        )
    } 
    return(
        <div>
            Select Time: 
            <select value={interval} onChange={updateTime}>
                {displayTimes()}
            </select>
             <button onClick={startTime}>Start</button> 
        </div>
    )
};

