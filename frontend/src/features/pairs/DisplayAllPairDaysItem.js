import React from "react";
import "./DisplayAllPairsDaysItem.css"
export default function DisplayAllPairDaysItem({ day }) {
  return (
    <ul className="displayAllPairDaysItemContainer">
      {day.map((pair) => {
        if (!pair[0] || !pair[1]) {
          return <li key={pair[0] + pair[1]}>{pair[0] || pair[1]} - Solo</li>;
        } else {
          return (
            <li key={pair[0] + pair[1]}>
              {pair[0]} & {pair[1]}
            </li>
          );
        }
      })}
    </ul>
  );
}
