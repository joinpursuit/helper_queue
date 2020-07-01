import React from 'react'
import ResourceListIndex from './resourceList/ResourceListIndex';
import codePractice from '../assets/resources/practiceCoding.json';
import documentation from '../assets/resources/documentation.json';
import curriculum from '../assets/resources/curriculum.json';
import "../css/Home.css"
import Timer from './widgets/Timer';

export default () => {
    return(
        <div className="homeContainer">
        <div className="headerContainer">
                <div className="gitHubLink localHostLink" data-testid="githubLinkContainer">
                <a href="https://github.com/joinpursuit" data-testid="githubLink" target="__blank">GitHub</a>
            </div>
            <h1 className="homeHeader" data-testid="homeHeader">Helpful Resources And Links</h1>
            <div className="localHostLink" data-testid="localhostLinkContainer">
                    <a href="http://localhost:3000" target="__blank" data-testid="localhostLink">Localhost:3000</a>
            </div>
        </div>
            <Timer />
            <ul className="resourceListContainer">
                <ResourceListIndex header={codePractice.header} list={codePractice.list}/>
                <ResourceListIndex header={documentation.header} list={documentation.list}/>
                <ResourceListIndex header={curriculum.header} list={curriculum.list}/>
            </ul>


        </div>
    )
}
