import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SignupScreen() {
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const resetFields = () => {
        setUsername('');
        setFullname('');
        setPassword('');
        setRole(null);
    };

    const handleSignup = async (event) => {
        event.preventDefault();

        const requestBody = {
            role,
            Fullname: fullname,
            email: username,
            password,
        };

        try {
            const response = await axios.post('http://localhost:3000/signup', requestBody);

            if (response.status === 200) {
                const data = response.data;

                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('Userid', data.user);
                localStorage.setItem('role', data.role);

                data.role === 'NGO' ? navigate('/ngo') : navigate('/user');
                resetFields();
            }
        } catch (error) {
            console.error('Signup error:', error);
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('Failed to register user');
            }
        }
    };

    return (
        <div className="flex items-center justify-center bg-gray-50"
            style={{
                width: '100vw',
                height: '100vh'
            }}
        >
            <div className="bg-transparent p-6 rounded-lg  mx-auto mt-10"
                style={{
                    width: '500px',
                    height: '700px'
                }}
            >
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h1>
                <form
                    onSubmit={handleSignup}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px'
                    }}
                >
                    <label className="text-gray-700 text-sm font-medium mb-2">Type of Role:</label>
                    <select
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="type"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="">Select a role</option>
                        <option value="NGO">NGO</option>
                        <option value="User">User</option>
                    </select>

                    <label htmlFor="username" className="text-gray-700 text-sm font-medium mb-2">Username:</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />

                    <label htmlFor="fullname" className="text-gray-700 text-sm font-medium mb-2">Fullname:</label>
                    <input
                        type="text"
                        id="fullname"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        required
                    />

                    <label htmlFor="password" className="text-gray-700 text-sm font-medium mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Sign Up
                    </button>
                </form>
                <p className="mt-4 text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
                {error && (
                    <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
                )}
            </div>
        </div>
    );
}

export default SignupScreen;
