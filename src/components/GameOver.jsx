import React from 'react'

function GameOver({ winner , onRematch }) {
  return (
    <div id='game-over'>
        {winner && <h2>{winner} Won ...</h2>}
        {!winner && <h2>Draw</h2>}
        <p>
            <button onClick={onRematch}>Rematch</button>
        </p>
    </div>
  )
}

export default GameOver;