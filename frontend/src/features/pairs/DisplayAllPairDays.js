import React from 'react';
import DisplayAllPairDaysItem from './DisplayAllPairDaysItem';
import './DisplayAllPairDays.css'
export default function DisplayAllPairDays({days}) {
    return(
        <div >
            <ul>
                {days.map((day, i) => {
                    return (
                      <li key={i} className={"pairDayCard"}>
                        <div>Day {i + 1}</div>
                        <DisplayAllPairDaysItem day={day} />
                      </li>
                    ); 
                })}
            </ul>
        </div>
    )
};
