import React, { Component } from 'react';
import Card from '../Card';
import "./BlackJack.css";
import { wait } from '@testing-library/react';

class BlackJack extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dealerCards: [],
            playerCards: [],
            usedCards: [],
            gamePhase: 0,
            chips: 500,
            bet: 10,
            status: "Place a bet and hit start game to begin",
        };
        this.suitDic = { 0: "Spades", 1: "Clubs", 2: "Diamonds", 3: "Hearts" };
    }

    componentDidMount() {
    }

    generateCard(used, upwards = true) {
        var newCard = [Math.floor(Math.random() * 13 + 1), Math.floor(Math.random() * 4)];
        var checked = false;
        while (!checked) {
            for (var i = 0; i < used.length; i++) {
                if (used[i][0] == newCard[0] && used[i][1] == newCard[1]) {
                    console.log("Already used ", newCard)
                }
            }
            checked = true
            newCard = [Math.floor(Math.random() * 13 + 1), Math.floor(Math.random() * 4)];
        }

        return [newCard[0], this.suitDic[newCard[1]], upwards];
    }

    startGame = () => {
        var dealerCards = [];
        var playerCards = [];
        var usedCards = this.state.usedCards.slice();
        dealerCards.push(this.generateCard(usedCards));
        dealerCards.push(this.generateCard(usedCards, false));
        playerCards.push(this.generateCard(usedCards));
        playerCards.push(this.generateCard(usedCards));
        this.setState({ dealerCards: dealerCards, playerCards: playerCards, gamePhase: 1, usedCards: usedCards, status: "Players move" })
    }

    hit = () => {
        var playerCards = this.state.playerCards;
        var usedCards = this.state.usedCards.slice()
        playerCards.push(this.generateCard(usedCards));
        this.setState({ playerCards: playerCards, usedCards: usedCards });
        console.log(Math.min(...this.getScores(playerCards)));
        if(Math.min(...this.getScores(playerCards))>21){
            this.setState({status: "Player busted.", gamePhase: 3, chips: this.state.chips - this.state.bet})
        }
    }

    dealerMove = () =>{
        var bestDealerScore = 0;
        var bestPlayerScore = 0;
        var dealerCards = this.state.dealerCards.slice();
        var allDealerScores = this.getScores(dealerCards, true);
        var allPlayerScores = this.getScores(this.state.playerCards);
        console.log(allDealerScores);
        var usedCards = this.state.usedCards.slice();
        for(var i in allDealerScores){
            if(allDealerScores[i]<22 && allDealerScores[i]>bestDealerScore){
                bestDealerScore = allDealerScores[i];
            }
        }
        for(var i in allPlayerScores){
            if(allPlayerScores[i]<22 && allPlayerScores[i]>bestPlayerScore){
                bestPlayerScore = allPlayerScores[i];
            }
        }
        console.log(bestDealerScore)
        if(bestDealerScore==0){
            this.setState({status: "Player wins", gamePhase: 3, chips: this.state.chips + this.state.bet});
        }else if(bestDealerScore<bestPlayerScore){
            dealerCards.push(this.generateCard(usedCards));
            this.setState({dealerCards: dealerCards, usedCards: usedCards})
            setTimeout(this.dealerMove, 1000);
        }else if(bestDealerScore===bestPlayerScore){
            if(bestDealerScore<15){
                dealerCards.push(this.generateCard(usedCards));
                this.setState({dealerCards: dealerCards, usedCards: usedCards})
                setTimeout(this.dealerMove, 1000);
            }else{
                this.setState({status: "Push", gamePhase: 3});
            }
        }else{
            this.setState({status: "Dealer wins", gamePhase: 3, chips: this.state.chips - this.state.bet});
        }
    }

    getScores(cards, allCards = false){
        var possibleScores = [0];
        var cards = this.mapCards(cards);
        var returnScores = [];
        for(var card in cards){
            var value = cards[card].props.value;
            if(!cards[card].props.faceUp && !allCards){
                continue;
            }
            if(value == 1){
                var branchValues = []
                for(var i = 0; i<possibleScores.length;i++){
                    branchValues.push(possibleScores[i] + 11);
                    possibleScores[i] += 1;
                }
                possibleScores = possibleScores.concat(branchValues);
            }else{
                for(var i = 0; i<possibleScores.length;i++){
                    possibleScores[i] += Math.min(10,value);
                } 
            }
        }
        for(var i in possibleScores){
            if(!returnScores.includes(possibleScores[i])){
                returnScores.push(possibleScores[i]);
            }
        }
        return(returnScores);
    }

    stand = () => {
        var dealerCards = this.state.dealerCards.slice();
        dealerCards[1] = [dealerCards[1][0], dealerCards[1][1], true];
        this.setState({ dealerCards: dealerCards, gamePhase: 2, status: "Dealer's move."});
        setTimeout(this.dealerMove, 1000);
    }

    mapCards(cards) {
        var mappedCards = cards.map(card => {
            return (<Card value={card[0]} suit={card[1]} faceUp={card[2]} />)
        }
        );
        return mappedCards;
    }

    changeBet(delta){
        var newBet = this.state.bet + delta;
        console.log(newBet);
        if(newBet > this.state.chips || newBet <= 0){
            this.setState({status: "Invalid Bet"});
        }else{
            this.setState({bet:newBet});
        }
    }

    doubleDown = () =>{
        if(this.state.bet<this.state.chips/2){
            this.changeBet(this.state.bet);
            this.hit();
            this.stand();
        }else{
            this.setState({status: "Cannot double down."})
        }
    }

    render() {
        var buttons;
        switch (this.state.gamePhase){
            case 1:
                buttons = (
                    <div id="Controls">
                        <button id="Button" onClick={this.hit}>Hit</button>
                        <button id="Button" onClick={this.stand}>Stand</button>
                        {this.state.playerCards.length === 2 ?  <button id="Button" onClick={this.doubleDown}>Double Down</button>: null};
                        
                    </div>
                );
                break;
            default:
                buttons = (
                    <div id="Controls">
                        <button id="Button" onClick={this.startGame}>Start Game</button>
                        <button id="Button" onClick={this.changeBet.bind(this, 5)}>Increase Bet</button>
                        <button id="Button" onClick={this.changeBet.bind(this, -5)}>Decrease Bet</button>
                    </div>
                );
                break;

        }
        return (
            <div className="BlackJack">
                <h1>Black Jack</h1>
                <h2>Status: {this.state.status}</h2>
                <h2>Chips: {this.state.chips}</h2>
                <h2>Bet: {this.state.bet}</h2>
                <h2 id="BlackJackSubTitle">{this.state.gamePhase != 0 ? ("Dealer: " + this.getScores(this.state.dealerCards)): ""}</h2>
                <div id="BJCards">
                    {this.mapCards(this.state.dealerCards)}
                </div>
                <h2 id="BlackJackSubTitle">{this.state.gamePhase != 0 ? ("Player: " + this.getScores(this.state.playerCards)): ""}</h2>
                <div id="BJCards">
                    {this.mapCards(this.state.playerCards)}
                </div>
                {buttons}
            </div>
        );
    }
}

export default BlackJack;