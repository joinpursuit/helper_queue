import React from 'react';
import DisplayAllPairDaysItem from './DisplayAllPairDaysItem';

export default function DisplayAllPairDays({days}) {
    return(
        <div>
            <ul>
                {days.map((day, i) => {
                    return<li key={i}>
                    <div>Day {i + 1}</div>
                    <DisplayAllPairDaysItem day={day} />
                    </li> 
                })}
            </ul>
        </div>
    )
};
