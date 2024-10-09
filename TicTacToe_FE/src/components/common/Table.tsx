import React from 'react';
import './Style/Table.css';
interface TableProps<T> {
  headers: string[];         
  data: T[];                 
  renderRow: (item: T) => React.ReactNode; 
}

const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => {
  return (
    <div className="game_history-table">
      <h2>Game History</h2>
      <table className="table1">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>{renderRow(item)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
