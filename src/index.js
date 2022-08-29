import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// Pass properties down from one class with props
// onClick and handleClick can be called anything but convention is to use onEvent and handleEvent

// class Square extends React.Component {

    function Square(props){
        return (
            <button className="square" onClick={props.onClick}>
            {props.value}
            </button>
        )
    }
  
  class Board extends React.Component {
    renderSquare(i) {
      return (
        <Square
             value={this.props.squares[i]} 
            onClick={() => this.props.onClick(i)}
        />
       );
    }
    render() {
    //   const status = `Next player: ${this.selectShape()}`;
  
      return (
        <div>
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
    // constructor (props){
    //     super(props)
    //     this.state = {
    //         history: new Array([{
    //             squares: Array(9).fill(null)
    //         }]),
    //         xIsNext: true
    //     }
    // }
    constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null)
          }],
          xIsNext: true,
          stepNum: 0
        };
      }

    selectShape(){
        return (this.state.xIsNext ? 'X' : 'O')
    }
    checkSquareEmpty(i){
        const hist = this.state.history
        return hist[hist.length -1].squares[i] == null ? true : false
    }

    // This method updates the value of the square in this.state.squares
    handleClick(i){
        // Shallow copy of the array
        // const hist = this.state.history
        const hist = this.state.history.slice(0, this.state.stepNum + 1)
        const current = hist[hist.length - 1]
        const squares = hist[hist.length -1].squares.slice()
        // Modify the cell which has been clicked
        // squares[i] = 'X'
        if (this.checkSquareEmpty(i)){
            squares[i] = this.selectShape()
            // Update the state
            this.setState({
                history: hist.concat([{squares: squares}]),
                xIsNext: !this.state.xIsNext,
                stepNum: this.state.history.length

                })
        } else {
            console.log('Square not clickable')
            window.alert('Other player already selected this box')
        }
    }

    moveTo(step){
        this.setState({
            stepNum: step,
            xIsNext: step % 2 === 0
        })

    }

    render() {
        const hist = this.state.history
        // const current_board = hist[hist.length -1]
        const current_board = hist[this.state.stepNum]
        const winner = calculateWinner(current_board.squares)
        let status = (winner == null) ? `Next player: ${this.selectShape()}` : `Winner is ${winner}`
        let goNumber = this.state.stepNum

        // Track moves to display
        const moves = hist.map((move, step) => {
            const goToDesc = step ? `Go to move: ${step}` : `Go back to start`
            // Always very important to assign a unique key to a dynamically created components
            return <li key={step}>
                <button onClick={() => this.moveTo(step)}>{goToDesc}</button>
            </li>
        })
        
        return (
            <div className="game">
                <div className="game-board">
                    <Board 
                        squares={current_board.squares} 
                        onClick={(i) => this.handleClick(i)} 
                    />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <div>{`This is go number: ${goNumber}`}</div>
                <ol>{moves}</ol>
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