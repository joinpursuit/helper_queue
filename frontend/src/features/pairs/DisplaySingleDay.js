import React from "react";

export default function DisplaySingleDay({
  day,
  currentDay,
  totalDays,
  changeDay,
}) {
  if (!day) return null;
  return (
    <div>
      <h3>
        Day: {currentDay + 1} of {totalDays}{" "}
      </h3>
      <ul>
        {day.map((pair, i) => {
          return (
            <li key={pair[0] + pair[1]}>
              {(!pair[0] || !pair[1])
                ? (pair[0] || pair[1]) + " - Solo"
                : pair[0] + " & " + pair[1]}
            </li>
          );
        })}
      </ul>
      <div>
        <button onClick={() => changeDay(currentDay - 1)}>Previous Day</button>
        <button onClick={() => changeDay(currentDay + 1)}>Next Day</button>
      </div>
    </div>
  );
}
