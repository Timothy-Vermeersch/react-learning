import React from 'react';
import './App.css';
import pagesLogo from './Images/githubPages.png'
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

function PageFrame(){
    return (
        <div className="PageFrame">
            <header className="Page-header">
            <Link to = "/" className = "Pages-logo">
                <img src={pagesLogo} id = "pages-image"/>
            </Link>
            <h1 id = "Header-title">Timothy Vermeersch's Github Page</h1>
            <div id = "Top-Tabs">
                <Link className = "Tabs" to = "/Projects">Projects</Link>
                <Link className = "Tabs" to = "/About">About Me</Link>
                <Link className = "Tabs" to = "/Games">Games</Link>
            </div>
            </header>
        </div>
    );
}


export default PageFrame;