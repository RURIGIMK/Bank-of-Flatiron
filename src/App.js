import React, { useState, useEffect } from 'react';
import './App.css';

const fetchTransactions = async () => {
  const response = await fetch('http://localhost:3001/transactions');
  const data = await response.json();
  return data;
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const getTransactions = async () => {
      const fetchedTransactions = await fetchTransactions();
      setTransactions(fetchedTransactions);
    };
    getTransactions();
  }, []);

  const handleAddTransaction = () => {
    const newTransaction = {
      id: transactions.length + 1,
      description,
      amount: parseFloat(amount)
    };
    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount('');
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Transactions</h1>
      <input
        type="text"
        placeholder="Search by description"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.description}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add Transaction</h2>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <button onClick={handleAddTransaction}>Add</button>
    </div>
  );
};

export default App;
