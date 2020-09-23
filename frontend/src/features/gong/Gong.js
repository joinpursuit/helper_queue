import React, { useState,useContext } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { SocketContext } from "../../providers/SocketProvider";

import gong from "../../assets/gong3.png";
import gongSound from "../../assets/gongSound.wav";
import "./Gong.css";

export default function Gong(params) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [shake, setShake] = useState("");
  const { width, height } = useWindowSize();
  const [recycle, setRecycle] = useState(true);
  const socket = useContext(SocketContext);

  const startParty = () => {
    setShowConfetti(true);
    socket.emit("ringGong");
    let src = gongSound;
    let audio = new Audio(src);
    audio.play();
    setRecycle(true);
    setShake(true);
    window.setTimeout(() => {
      setShake(false);
      setRecycle(false);
    }, 5000);
  };
  const stopParty = () => {
    setShowConfetti(false);
  };
  let style = shake ? "gong shake" : "gong";
  return (
    <div className="gongContainer">
      {showConfetti ? (
        <Confetti
          width={width}
          height={height}
          recycle={recycle}
          numberOfPieces={300}
        />
      ) : null}
      <img onMouseEnter={startParty} className={style} src={gong} alt="gong" />
    </div>
  );
}
