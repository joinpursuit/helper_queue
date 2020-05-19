import React, { useState } from 'react'
import "../../css/ResourceListIndex.css";

export default function ResourceListIndex({header, list}) {
    const [showList, setShowList] = useState(false);
    const displayList = () => {
        if(!showList) return null;
        return(
            <ul className="resourceListIndex">
                {list.map((listItem, i) => {
                    return(
                            <a key={i} href={listItem.url} target="__blank">{listItem.name}</a>
                    )
                })}
            </ul>

        )
    }
    return(
        <div className="resourceListContainerOfIndex"
        
        onMouseEnter={() => setShowList(true)}
            onMouseLeave={() => setShowList(false)}>
            <h1>{header}</h1>
            {displayList()}
        </div>
    )
};
