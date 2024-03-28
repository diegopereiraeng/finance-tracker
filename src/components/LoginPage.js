import React from 'react';
import '../App.css';

function LoginPage({ onLogin }) {
    return (
        <div className="login-container">
        <img src="devopsexp2.png" alt="Login" className="login-image"/>
        <button onClick={onLogin} className="login-button">Enter</button>
        </div>
    );
}

export default LoginPage;
