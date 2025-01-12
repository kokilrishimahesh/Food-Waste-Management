import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';

function SignupScreen() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFullnameChange = (event) => {
        setFullname(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignup = async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Create request body
        const requestBody = {
            role : role,
            Fullname: fullname,
            email: username,
            password: password
        };

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                // Set login status in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('Userid', data.user);
                localStorage.setItem('role', data.role);

                // Redirect to dashboard page
                navigate('/dashboard');
                console.log('Signup successful:', data);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to register user');
            }
        } catch (error) {
            console.error('Signup error:', error);
            setError('Failed to register user');
        }
    };

    return (
        <div id='signupForm'>
            <h2>Sign Up</h2>
            <form onSubmit={handleSignup}>
                <label>Type of Donation:</label>
                <select
                    name="type"
                    value={role}
                    onChange={(e)=>{setRole(e.target.value)}}
                    required
                >
                    <option value="">Select a role</option>
                    <option value="NGO">NGO</option>
                    <option value="User">User</option>
                </select>
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
                    <label htmlFor="fullname">Fullname:</label>
                    <input
                        type="text"
                        id="fullname"
                        value={fullname}
                        onChange={handleFullnameChange}
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
                <button
                    type="submit"
                    onClick={handleSignup}
                >Sign Up</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p> {/* Link to the login screen */}
            {
                error &&
                <p>{error}</p>
            }
        </div>
    );
}

export default SignupScreen;
