
import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import './index.css'
import { WINNING_COMBINATIONS } from './winningCombination.js'
import GameOver from './components/GameOver.jsx';
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
const PLAYERS = {
  X : "Player 1",
  O : "Player 2"
}

function App() {
  
  const [gameTurns, setGameTurns] = useState([]);

  const [playerNames , setPlayerNames] = useState(PLAYERS)
  // console.log("This " , PLAYERS['O']);
  let activePlayer = 'X';
  let gameBoard = [...initialGameBoard.map((innerArr) => [...innerArr])];
  const handleRematch = function() {
    setGameTurns([]);
  }
  
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;


    gameBoard[row][col] = player;
  }
  // console.log(WINNING_COMBINATIONS);
  let winner , hasDraw = false;
  for(const com of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[com[0].row][com[0].column];
    const secondSquareSymbol = gameBoard[com[1].row][com[1].column];
    const thirdSquareSymbol = gameBoard[com[2].row][com[2].column];
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = playerNames[firstSquareSymbol];
    }
  }
  if(gameTurns.length === 9 && !winner){
    hasDraw = true;
  }
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    activePlayer = 'O';
  }

  function handleSelectSquare(rowIndex, colIndex) {
    
    setGameTurns((prevTurns) => {
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }
  const handleNameChange = (symbol , newName) => {
    setPlayerNames((prev) => {
      return {
        ...prev,
        [symbol] : newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onNameChange = {handleNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onNameChange = {handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner = {winner} onRematch = {handleRematch} />}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
          gameBoard={ gameBoard}
        />
      </div>
      <Log turns = {gameTurns} />
    </main>
  );
}

export default App;
