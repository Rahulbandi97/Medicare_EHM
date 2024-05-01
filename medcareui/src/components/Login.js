import React, { useState } from 'react';
import './css/Login.css';

function Login() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({
            ...prevCredentials,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('https://your-api-url/login', { //TO BE CHANGED
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log('Login successful:', data);
            // Handle response and perform further actions like redirecting
        } catch (error) {
            console.error('Login failed:', error);
            // Handle errors, e.g., show error message to user
        }
    };

    return (
        <div className="login-container">
            {/* <h2>MedicareLink Login/</h2>/ */}
            <form onSubmit={handleSubmit} className="form-container">
                <div>
                    <label>Username:</label>
                    <input
                        type="email" // Use "text" if usernames are not emails
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
