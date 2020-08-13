import React from 'react';
import Bot from './Bot/Bot';
import './Project.css';

var projectDictionary = {"Bot":<Bot/>}
const GameContainer = ({match, location}) =>{
    return projectDictionary[match.params.projectId];
}

export default GameContainer;