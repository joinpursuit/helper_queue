import React, { useState } from 'react'
import "./ResourceListIndex.css";

export default function ResourceListIndex({header, list}) {
    const [showList, setShowList] = useState(false);
    const displayList = () => {
        if(!showList) return null;
        return(
            <ul className="resourceListIndex" data-testid="resourceListUL">
                {list.map((listItem, i) => {
                    return(
                            <a key={i} href={listItem.url} target="__blank" data-testid="resourceListItem">{listItem.name}</a>
                    )
                })}
            </ul>

        )
    }
    return(
        <div className="resourceListContainerOfIndex"
            data-testid="resourceListIndexContainer"
        onMouseEnter={() => setShowList(true)}
            onMouseLeave={() => setShowList(false)}>
            <h1 data-testid="resourceListHeader">{header}</h1>
            {displayList()}
        </div>
    )
};
