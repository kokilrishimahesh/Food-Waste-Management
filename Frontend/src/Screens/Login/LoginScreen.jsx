import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './Login.css'; // Import the CSS file
import axios from 'axios';

function LoginScreen() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const requestBody = {
            email: username,
            password
        };

        try {
            const response = await axios.post('http://localhost:3000/login', requestBody);

            if (response.status == 200) {
                const data = await response.data;
                console.log('Login successful:', data);

                // Set login status in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem("Userid" , data.userid);
                localStorage.setItem("role" , data.role);


                data.role == "NGO" 
                    ? navigate('/ngo')
                    : navigate('/user');
            } else {
                const errorData = await response.data;
                console.error('Login failed:', errorData.message);
                // TODO: Handle failed login (e.g., display error message to user)
            }
        } catch (error) {
            console.error('Login error:', error);
            // TODO: Handle fetch error (e.g., display error message to user)
        }
    };

    return (
        <div id='loginForm'>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <button type="submit"
                    onClick={handleLogin}
                >Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p> {/* Link to the signup screen */}
        </div>
    );
}

export default LoginScreen;
