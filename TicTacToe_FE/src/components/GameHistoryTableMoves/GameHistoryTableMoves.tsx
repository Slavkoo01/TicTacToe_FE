import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import Board from '../Game/Board'; 
import "./GameHistoryTableMoves.css"; 
import client from "../../utils/apolloClient"; 

const GET_MOVES_BY_GAME_ID = gql`
  query getMovesByGameId($gameId: ID!) {
    getMovesByGameId(gameId: $gameId) {
      id
      move_position
      player_id
    }
  }
`;

interface Move {
  id: string;
  move_position: number;
  player_id: string;
}
const GameHistoryTableMoves: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { gameId, player1Id, player1, player2, player1_sign } =
    location.state || {};

  const { loading, error, data } = useQuery(GET_MOVES_BY_GAME_ID, {
    variables: { gameId },
    client,
    skip: !gameId,
  });

  const [currentMove, setCurrentMove] = useState(0); 
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null)); 

  const player2_sign = player1_sign === "X" ? "O" : "X"; 
  //alert(player2_sign);
  
  const moves: Move[] = data?.getMovesByGameId || [];

  useEffect(() => {
    if(!gameId){
      navigate('/', { replace: true});
    }
    if (moves.length > 0) {
      updateSquares(currentMove);
    }
  }, [moves, currentMove]);

  if (loading) return <p>Loading moves...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const updateSquares = (moveIndex: number) => {
    const newSquares = Array(9).fill(null); 
    for (let i = 0; i <= moveIndex; i++) {
      const { player_id, move_position } = moves[i];
      newSquares[move_position] = player_id === player1Id ? player1_sign : player2_sign;
    }
    setSquares(newSquares);
  };


  const goToNextMove = () => {
    if (currentMove < moves.length - 1) {
      setCurrentMove(currentMove + 1);
    }
  };


  const goToPreviousMove = () => {
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  };

  return (
    <div className="game-history-container">
      <div className="game-info">
        <h2>Game Moves History</h2>
        <p><strong>Game ID:</strong> {gameId}</p>
        <p><strong>Player 1:</strong> {player1} (Sign: {player1_sign})</p>
        <p><strong>Player 2:</strong> {player2} (Sign: {player2_sign})</p>
      </div>


      <div className="board-container">
        <Board
          squares={squares}
          onSquareClick={() => {}}
          xIsNext={currentMove % 2 === 0}
          winner={null} 
          isGameHistoryMoves={true}
        />
      </div>

      {/*NavButtons*/}
      <div className="move-navigation">
        <button onClick={goToPreviousMove} disabled={currentMove === 0} className="nav-button">
          Previous Move
        </button>
        <button onClick={goToNextMove} disabled={currentMove >= moves.length - 1} className="nav-button">
          Next Move
        </button>
      </div>

      {/*List */}
      <div className="moves-list">
        <h3>Moves</h3>
        <ul>
          {moves.map((move, index) => {
            const isPlayer1 = move.player_id === player1Id;
            return (
              <li key={move.id}>
                <button 
                  onClick={() => setCurrentMove(index)}
                  className={`move-button ${currentMove === index ? 'active' : ''}`}>
                  {index + 1}. {isPlayer1 ? player1 : player2} ({isPlayer1 ? player1_sign : player2_sign}) moved to position {move.move_position}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default GameHistoryTableMoves;
