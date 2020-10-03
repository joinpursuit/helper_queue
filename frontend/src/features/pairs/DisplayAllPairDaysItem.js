import React from "react";

export default function DisplayAllPairDaysItem({ day }) {
  return (
    <ul>
      {day.map((pair) => {
        if (!pair[0] || !pair[1]) {
          return <li key={pair[0] + pair[1]}>{pair[0] || pair[1]} Working Solo</li>;
        } else {
          return (
            <li key={pair[0] + pair[1]}>
              {pair[0]} AND {pair[1]}
            </li>
          );
        }
      })}
    </ul>
  );
}
