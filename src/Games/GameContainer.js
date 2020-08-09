import React from 'react';
import BlackJack from './BlackJack/BlackJack.js';
import TicTacToe from './TicTacToe/TicTacToe.js';

const gamesDic = {"BlackJack":<BlackJack/>, "TicTacToe":<TicTacToe/>}

const GameContainer = ({match, location}) =>{
    return gamesDic[match.params.gameId]
}

export default GameContainer;