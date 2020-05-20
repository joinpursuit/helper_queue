import React, { useState } from 'react'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'
import gong from '../assets/gong3.png'
import gongSound from '../assets/gongSound.wav'
import '../css/Gong.css'

export default function Gong(params) {
    const [showConfetti, setShowConfetti] = useState(false)
    const [shake, setShake] = useState("")
    const { width, height } = useWindowSize()

    const startParty = () => {
        setShowConfetti(true);
        let src = gongSound;
        let audio = new Audio(src);
        audio.play();
        setShake(true)
        window.setTimeout(() => {
            setShake(false);
        }, 5000)
   
    }
    const stopParty = () => {
        setShowConfetti(false);
    }
    let style =  shake ? "gong shake" : "gong"
    return (
        <div className="gongContainer">
           {showConfetti ?  <Confetti
                width={width}
                height={height}
            /> : null
           }
           <img onMouseEnter={startParty} className={style} src={gong} alt="gong" />
        </div>
    )
};
