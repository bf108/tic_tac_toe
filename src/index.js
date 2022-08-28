import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


// Pass properties down from one class with props
// onClick and handleClick can be called anything but convention is to use onEvent and handleEvent

class Square extends React.Component {

    render() {
      return (
        <button 
            className="square"
            // Calls the onClick method from parent (Board)
            onClick={() => this.props.onClick()}>{this.props.value}</button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {squares: Array(9).fill(null), 
                    // players: new Array([1,2]),
                    // current_player: new Array([1,2])
                }}

    // switchPlayer(){

    //     console.log(`The current player is: ${this.state.current_player}`)
    //     console.log(this.state.players)
    //     let new_state = this.state.current_player.slice()
    //     if (new_state.splice(-1) !== 1){
    //         new_state.push(1)
    //         console.log(`New state of current player: ${new_state}`)
    //         this.setState({current_player: new_state})
    //         } else {
    //         new_state.push(2)
    //         console.log(`New state of current player: ${new_state}`)
    //         this.setState({current_player: new_state})
    //     }
    // }

    // selectShape(){
    //     return (this.state.current_player.splice(-1) == 1 ? 'X' : 'O')
    // }

    // This method updates the value of the square in this.state.squares
    handleClick(i){
        // Shallow copy of the array
        const squares = this.state.squares.slice()
        // Modify the cell which has been clicked
        squares[i] = 'X'
        // squares[i] = this.selectShape()
        // Update the state
        this.setState({squares: squares})

        // Change player
        // this.switchPlayer()

    }



    renderSquare(i) {
      return (
        <Square
             value={this.state.squares[i]} 
            onClick={() => this.handleClick(i)}
        />
       );
    }
  
    render() {
      const status = 'Next player: X';
  
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
  