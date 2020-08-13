import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';
import ProjectTab from './Projects/ProjectTab';
import GameTab from './Games/GameTab'; 
function Home(){
    return(
        <div id = "Home">
            <div id = "Welcome">
                <h2 id = "SubTitle">Welcome To My Site</h2>
                <h3>A collection of many of the personal software projects<br/> I have worked on.</h3>
            </div>
            <div id = "Featured">
                <h2 id = "SubTitle">Featured Project</h2>
                <div id = "featured-project">
                    <ProjectTab name = "Automated Instagram Bot" src = "BotTab.jpg" description = "An Instagram bot written in Python using the Selenium library. This bot automatically runs a page doing such things as finding content, posting, following and unfollowing users." path = "Bot"/>
                </div>
                <Link id = "Small-Link" to = "/Projects">Here are some of my other projects</Link>
                <h2 id = "SubTitle"> Featured Game</h2>
                <div id = "featured-game">
                    <GameTab id = "feat" name = "Blackjack" src = "blackjack.jpg" path = "BlackJack" description = "Place bets against a dealer and pull cards to try and reach Blackjack(21). Make sure not to go over 21 or you automatically bust. "/>
                </div>
            </div>
        </div>
    );
}

export default Home;