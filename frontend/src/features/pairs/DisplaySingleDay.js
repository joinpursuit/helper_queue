import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import clipboard from '../../assets/clipboard.png'
import "./DisplaySingleDay.css";
import { updatePairList } from "./pairsSlice";

export default function DisplaySingleDay({
  day,
  currentDay,
  totalDays,
  changeDay,
}) {
  if (!day) return null;
  return (
    <div className="displaySingleDayContainer">
      <div className="displaySingleDayButtons">
        <button onClick={() => changeDay(currentDay - 1)}>Previous Day</button>
        <h3>
          Day: {currentDay + 1} of {totalDays}
          <button
            className="clipboardPairsButton" onClick={() => {
              navigator.clipboard.writeText(buildDayText(day, `Day: ${currentDay + 1} of ${totalDays}`));
            }}
          >
            <img src={clipboard} alt="copy" className="clipboardPairs" />
          </button>
        </h3>
        <button onClick={() => changeDay(currentDay + 1)}>Next Day</button>
      </div>
      <ol className={"displaySingleDayPairs"}>
        {day.map((pair, i) => {
          return (
            <li key={pair[0] + pair[1]}>
              {!pair[0] || !pair[1] ? (
                <>
                  <div className="displaySingleDayPairsLeft">
                    {i + 1}. {pair[0] || pair[1]}{" "}
                  </div>
                  <div>-</div>
                  <div className="displaySingleDayPairsRight">Solo</div>
                </>
              ) : (
                <>
                  <div className="displaySingleDayPairsLeft">
                    {" "}
                    {i + 1}. {pair[0]}{" "}
                  </div>
                  <div className="displaySingleDayPairsSym">&</div>
                  <div className="displaySingleDayPairsRight">{pair[1]}</div>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const buildDayText = (day, intro = "") => {
  let pairs = day.map((pair, i) => {
    return !pair[0] || !pair[1]
      ? `${i + 1}. ${pair[0] || pair[1]} - Solo`
      : `${i + 1}. ${pair[0]} & ${pair[1]}`;
  })
  pairs.unshift(intro)
  return pairs.join("\n")
};
