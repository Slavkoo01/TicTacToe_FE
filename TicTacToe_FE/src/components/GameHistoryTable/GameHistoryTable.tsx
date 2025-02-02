import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
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
      player1_sign
    }
  }
`;
interface GameHistoryTableMoves {
  gameId: number;
  player1Id: number;
  player1: string;
  player2Id: number;
  player2: string;
  player1_sign: string;
}
const ResultEnum: { [key: number]: string } = {
  0: 'Draw',
  1: 'Player 1 Wins',
  2: 'Player 2 Wins',
};

const GameHistoryTable: React.FC = () => {
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(GET_GAME_HISTORY);
  useEffect(() => {
    const token = localStorage.getItem('JWT');
    
    if (!token) {
      navigate('/', { replace: true });
    } else {
      refetch();
    }
  }, [navigate, refetch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const gameHistory = data.getGamesByUsername.map((game: any) => ({
    id: game.game.id,
    player1: game.player1.username,
    player2: game.player2.username,
    result: ResultEnum[game.result],
    date: new Date(Number(game.gameDate)).toLocaleDateString(),
  }));
  const gameHistoryTableMoves = data.getGamesByUsername.map((game: any) => ({
    gameId: game.game.id,
    player1Id: game.player1.id,       
    player1: game.player1.username,
    player2Id: game.player2.id,        
    player2: game.player2.username,
    player1_sign: game.player1_sign,
  }));
  const headers = ['ID', 'Player 1', 'Player 2', 'Result', 'Date'];

  // Handle row click
  const onTrClick = (gameId: number) => {
    const selectedGame = gameHistoryTableMoves.find((game: GameHistoryTableMoves) => game.gameId === gameId);
    navigate('/historyTableMoves', { state: selectedGame });
    console.log(selectedGame);
  };

  const renderRow = (game: any) => (
    <>
      <td onClick={() => onTrClick(game.id)} style={{ cursor: 'pointer' }}>{game.id}</td>
      <td onClick={() => onTrClick(game.id)} style={{ cursor: 'pointer' }}>{game.player1}</td>
      <td onClick={() => onTrClick(game.id)} style={{ cursor: 'pointer' }}>{game.player2}</td>
      <td onClick={() => onTrClick(game.id)} style={{ cursor: 'pointer' }}>{game.result}</td>
      <td onClick={() => onTrClick(game.id)} style={{ cursor: 'pointer' }}>{game.date}</td>
    </>
  );

  return <Table headers={headers} data={gameHistory} renderRow={renderRow} />;
};

export default GameHistoryTable;
