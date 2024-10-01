import React from 'react';

// Define types for the props
interface TableProps<T> {
  headers: string[];         // Array of column headers
  data: T[];                 // Array of data items
  renderRow: (item: T) => React.ReactNode; // A function to map data to table rows
}

const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => {
  return (
    <div className="game_history-table">
      <h2>Game History</h2>
      <table className="table">
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
