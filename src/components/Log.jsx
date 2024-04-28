import React from 'react'

function Log({ turns }) {

    console.log("turns called");
    console.log(turns);
    return (
        <>
            <h3>Logs</h3>
            <ol>
                {turns.map((turn) => 
                    <li >{`player ${turn.player} selected ${turn.square.row} , ${turn.square.col}`}</li>
                )}
            </ol>
        </>
    )
}

export default Log