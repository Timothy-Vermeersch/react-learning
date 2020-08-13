import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

class GameTab extends React.Component{
    constructor(props){
        super(props);
        this.state = {description: null}
        this.src = props.src;
        this.name = props.name;
        this.path = props.path;
        this.description = props.description;
    }

    render(){
        return(
            <Link to = {"Games/" + this.path} >
                <div className = "Game-Tab" style = {{backgroundImage: "url(./Images/GameTabs/" + this.src + ")"}}>
                    <h2 onMouseLeave = {this.hideDescription} onMouseEnter = {this.showDescription} id = "title">{this.name}<p id = "description">{this.state.description}</p></h2>
                    
                </div>
            </Link>
        );
    }

    showDescription = () =>{
        setTimeout(this.setActual,250);
    }

    setActual = () =>{
        this.setState({description: this.description})
    }

    hideDescription = () =>{
        setTimeout(this.setNull,250);
    }

    setNull = () =>{
        this.setState({description: null})
    }
}

export default GameTab;