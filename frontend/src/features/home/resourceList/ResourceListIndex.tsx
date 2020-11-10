import React, { useState } from 'react'
import "./ResourceListIndex.css";

interface ResourceListIndexItem {
    name: string; 
    url: string;
}

interface ResourceListIndexProps {
  header: string;
  list: ResourceListIndexItem[];
}

export default function ResourceListIndex({header, list}: ResourceListIndexProps) {
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
