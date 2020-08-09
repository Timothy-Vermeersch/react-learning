import React from 'react';
import './TicTacToe.css';

  function Square(props){
      return (
        <button className="square" id = {props.value} onClick = {props.onClick}>
          {props.value}
        </button>
      );
  }
  
  class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            cpu: true,
            countDown: 5,
        };
        let countDown;
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i] || (this.state.cpu && !this.state.xIsNext)) {
          return;
      }
      squares[i] = this.state.xIsNext ? 'X' : "O";
      this.setState({squares: squares, xIsNext: !this.state.xIsNext});
      console.log(this.state.cpu);
      if(this.state.cpu){
        setTimeout(this.cpuMove, 500)
      }
    }

    cpuMove = () => {
      const squares = this.state.squares.slice();
      var placement = Math.floor(Math.random() *9);
      var rowMove = this.checkRows();
      var columnMove = this.checkColumns();
      var diagonalMove = this.checkDiagonal();
      if(!squares.includes(null) || calculateWinner(squares)){
        return;
      }
      if(rowMove != null){
        placement = rowMove;
      }else if(columnMove!= null){
        placement = columnMove;
      }else if(diagonalMove != null){
        placement = diagonalMove;
      }
      while(squares[placement] != null){
        placement = Math.floor(Math.random() *9);
      }
      squares[placement] = this.state.xIsNext ? 'X' : "O";
      this.setState({squares: squares, xIsNext: !this.state.xIsNext});
    }

    checkRows(){
      const squares = this.state.squares.slice();
      for(var i = 1; i<=8;i+=3){
        var check = [squares[i], squares[i-1], squares[i+1]]; 
        if(check.indexOf(null) != -1 && check.indexOf(null) == check.lastIndexOf(null) && new Set(check).size == 2){
          if(squares[i-1]==null){
            return i-1;
          }else if(squares[i]==null){
            return i;
          }else{
            return i+1;
          }
        }
      }
      return null;
    }

    checkColumns(){
      const squares = this.state.squares.slice();
      for(var i = 3; i<=5;i+=1){
        var check = [squares[i], squares[i-3], squares[i+3]];
        if(check.indexOf(null) != -1 && check.indexOf(null) == check.lastIndexOf(null) && new Set(check).size == 2){
          if(squares[i-3]==null){
            return i-3;
          }else if(squares[i]==null){
            return i;
          }else{
            return i+3;
          }
        }
      }
      return null;
    }

    checkDiagonal(){
      const squares = this.state.squares.slice();
      for(var i = 2; i<=4;i+=2){
        var check = [squares[4], squares[4-i], squares[4+i]];
        if(check.indexOf(null) != -1 && check.indexOf(null) == check.lastIndexOf(null) && new Set(check).size == 2){
          console.log(check)
          if(squares[4]==null){
            console.log(4)
            return 4;
          }else if(squares[4+i]==null){
            console.log(4+i)
            return 4+i;
          }else{
            console.log(4-i)
            return 4-i;
          }
        }
      }
      return null;
    }


    renderSquare(i) {
      return <Square value = {this.state.squares[i]} onClick = {() => this.handleClick(i)}/>;
    }

    reset(){
      this.setState({squares : Array(9).fill(null)});
      if(!this.state.xIsNext && this.state.cpu){
        console.log("bruh");
        setTimeout(this.cpuMove,1000);
      }
    }

    switchCpuSetting(newValue){
      this.setState({cpu:newValue});
    }

    incrementDown = () =>{ 
      console.log(this.state.countDown);
      if(this.state.countDown<=1){
        this.setState({countDown: 5});
        this.reset();
        clearInterval(this.countDown);
      }else{
        this.setState({countDown: this.state.countDown-1});
      }
    }

    render() {
        const winner = calculateWinner(this.state.squares);
        let status;
        var buttons = <div className = "button"/>
        
        if(this.state.squares.includes("X") || this.state.squares.includes("O")){
          buttons = <div className = "buttons">
            <button className = "button" onClick = {this.reset.bind(this)}>
            Restart
            </button>
          </div>
        }else{
          buttons = <div className = "buttons">
            <button className = "button" onClick = {this.switchCpuSetting.bind(this,false)}>
            2 Player
            </button>
            <button className = "button" onClick = {this.switchCpuSetting.bind(this,true)}>
            CPU
            </button>
          </div>
        }

        if(winner){
          status = 'Winner: ' + winner;
        } else if(this.state.squares.includes(null)){
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : "O");
        }else{
          status = "Restarting in: " + (this.state.countDown);
          clearInterval(this.countDown);
          this.countDown = setInterval(this.incrementDown, 1000);
        }
        
  
        return (
        <div>
          <h1 id = "Game-Title">Tic-Tac-Toe</h1>
          <h2 className="status">{status}</h2>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
          {buttons}
        </div>
      );
    }
  }
  
  class TicTacToe extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
      );
    }
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  export default TicTacToe;