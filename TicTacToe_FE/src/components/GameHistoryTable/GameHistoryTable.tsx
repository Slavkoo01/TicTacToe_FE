import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './GameHistoryTable.css';
import Table from '../common/Table';

const GET_GAME_HISTORY = gql`
  query getGamesByUsername {
    getGamesByUsername {
      id
      player1 {
        id
        username
        email
      }
      player2 {
        id
        username
        email
      }
      result
      game {
        id
        type
        status
        created_at
      }
      gameDate
    }
  }
`;


interface Game {
  id: number;
  player1: string;
  player2: string;
  result: 0 | 1 | 2;
  date: string;
}

const ResultEnum: { [key: number]: string } = {
  0: 'Draw',
  1: 'Player 1 Wins',
  2: 'Player 2 Wins',
};

const GameHistoryTable: React.FC = () => {
  const { loading, error, data } = useQuery(GET_GAME_HISTORY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  const gameHistory = data.getGamesByUsername.map((game: any) => ({
    id: game.id,
    player1: game.player1.username,
    player2: game.player2.username,
    result: ResultEnum[game.result],
    date: new Date(Number(game.gameDate)).toLocaleDateString(),
  }));
      
  const headers = ['ID', 'Player 1', 'Player 2', 'Result', 'Date'];

  const renderRow = (game: any) => (
    <>
      <td>{game.id}</td>
      <td>{game.player1}</td>
      <td>{game.player2}</td>
      <td>{game.result}</td>
      <td>{game.date}</td>
    </>
  );

  return <Table headers={headers} data={gameHistory} renderRow={renderRow} />;
};

export default GameHistoryTable;
