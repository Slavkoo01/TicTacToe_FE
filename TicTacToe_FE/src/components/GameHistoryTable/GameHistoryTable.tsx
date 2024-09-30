import React from "react";
import './GameHistoryTable.css'; // Ensure the correct file extension

interface Game {
    id: number;
    player1: string;
    player2: string;
    result: string;
    date: string;
}

interface GameHistoryTableProps {
    history: Game[];
}

const GameHistoryTable: React.FC<GameHistoryTableProps> = ({ history }) => {
  return (
    <div className="name_history-table">
        <h2>Game History</h2>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Result</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {history.map((game) => (
                    <tr key={game.id}>
                        <td>{game.id}</td>
                        <td>{game.player1}</td>
                        <td>{game.player2}</td>
                        <td>{game.result}</td>
                        <td>{game.date}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default GameHistoryTable;
