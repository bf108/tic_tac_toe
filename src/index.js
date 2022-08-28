import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// Pass properties down from one class with props
// onClick and handleClick can be called anything but convention is to use onEvent and handleEvent

// class Square extends React.Component {

//     render() {
//       return (
//         <button 
//             className="square"
//             // Calls the onClick method from parent (Board)
//             onClick={() => this.props.onClick()}>{this.props.value}</button>
//       );
//     }
//   }
    function Square(props){
        return (
            <button className="square" onClick={props.onClick}>
            {props.value}
            </button>
        )
    }
  
  class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {squares: Array(9).fill(null), 
                        xIsNext: true
                }}

    selectShape(){
        return (this.state.xIsNext ? 'X' : 'O')
    }

    checkSquareEmpty(i){
        return this.state.squares[i] == null ? true : false
    }

    // This method updates the value of the square in this.state.squares
    handleClick(i){
        // Shallow copy of the array
        const squares = this.state.squares.slice()
        // Modify the cell which has been clicked
        // squares[i] = 'X'
        if (this.checkSquareEmpty(i)){
            squares[i] = this.selectShape()
            // Update the state
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext
                })
        } else {
            console.log('Square not clickable')
            window.alert('Other player already selected this box')
        }
    }
    renderSquare(i) {
      return (
        <Square
             value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />
       );
    }

    checkWinner(){
        const status = calculateWinner(this.state.squares)
        return status == null ? `Next player: ${this.selectShape()}` : `Winner is ${status}`
    }
  
    render() {
    //   const status = `Next player: ${this.selectShape()}`;
      const status = this.checkWinner()
  
      return (
        <div>
          <div className="status">{status}</div>
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
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  
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