import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './GameHistoryTableMoves.css'; // Optional: CSS for styling
import client from "../../utils/apolloClient"; // Ensure this is your Apollo client instance

// GraphQL query to fetch moves based on game ID
const GET_MOVES_BY_GAME_ID = gql`
  query getMovesByGameId($gameId: ID!) {
    getMovesByGameId(gameId: $gameId) {
      id
      move_position  # Ensure this matches your GraphQL schema
      player_id      # Ensure this matches your GraphQL schema
    }
  }
`;

// Define the Move interface
interface Move {
  id: string;           // or number, depending on your schema
  move_position: number;
  player_id: string;    // or number, depending on your schema
}

const GameHistoryTableMoves: React.FC = () => {
  const location = useLocation();
  const { gameId, player1, player2 } = location.state || {};

  const { loading, error, data } = useQuery(GET_MOVES_BY_GAME_ID, {
    variables: { gameId },
    client, // Ensure you are using the correct Apollo Client
    skip: !gameId, // Skip the query if gameId is not available
  });

  if (loading) return <p>Loading moves...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const moves: Move[] = data?.getMovesByGameId || []; // Safely access moves and ensure it's typed

  return (
    <div className="app">
      <h2>Game Moves History</h2>
      <p>Game ID: {gameId}</p>
      <p>Player 1: {player1}</p>
      <p>Player 2: {player2}</p>

      <h3>Moves</h3>
      {moves.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Move ID</th>
              <th>Player ID</th>
              <th>Move Position</th>
            </tr>
          </thead>
          <tbody>
            {moves.map((move: Move) => (  // Specify the type for move
              <tr key={move.id}>
                <td>{move.id}</td>
                <td>{move.player_id}</td>
                <td>{move.move_position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No moves found for this game.</p>
      )}
    </div>
  );
};

export default GameHistoryTableMoves;
