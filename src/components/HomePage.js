import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; // Assuming CSS is in HomePage.css

function HomePage() {
    const [transactions, setTransactions] = useState([]);
    const [newTransaction, setNewTransaction] = useState({
        type: '',
        amount: '',
        category: '',
        date: new Date().toISOString().slice(0, 10), // Automatically set today's date
    });
    const backendURL = "http://localhost:8080";

    useEffect(() => {
        axios.get(`${backendURL}/transactions`, { withCredentials: true }).then(response => {
            setTransactions(response.data);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newTransaction.type || !newTransaction.amount || !newTransaction.category) {
            alert("Please fill in all fields.");
            return;
        }
        axios.post(`${backendURL}/transactions`, newTransaction, { withCredentials: true }).then(response => {
            axios.get(`${backendURL}/transactions`, { withCredentials: true }).then(response => {
                setTransactions(response.data);
            });
            setNewTransaction({ type: '', amount: '', category: '', date: new Date().toISOString().slice(0, 10) });
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransaction(prevState => ({
            ...prevState,
            [name]: name === 'amount' ? parseFloat(value) : value
        }));
    };

    return (
        <div className="home-container">
            <h1>Welcome to the Finance Tracker</h1>
            <div>
                <h2>Add Transaction</h2>
                <form onSubmit={handleSubmit} className="transaction-form">
                    <select name="type" value={newTransaction.type} onChange={handleInputChange} required>
                        <option value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <input type="number" name="amount" value={newTransaction.amount} onChange={handleInputChange} placeholder="Amount" required />
                    <select name="category" value={newTransaction.category} onChange={handleInputChange} required>
                        <option value="">Select Category</option>
                        <option value="food">Food</option>
                        <option value="transport">Transport</option>
                        <option value="housing">Housing</option>
                        <option value="utilities">Utilities</option>
                    </select>
                    <input type="date" name="date" value={newTransaction.date} onChange={handleInputChange} required />
                    <button type="submit">Add</button>
                </form>

                <h2>Transactions</h2>
                <ul className="transaction-list">
                    {transactions.map((transaction, index) => (
                        <li key={index}>{`${transaction.date} - ${transaction.type}: $${transaction.amount}`}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;
