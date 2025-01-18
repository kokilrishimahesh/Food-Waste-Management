import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./Dashboard.css"
import Sidebar from '../../Components/Sidebar';

const Dashboard = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (!isLoggedIn) {
            navigate('/login');
        }
        else {
            navigate("/user/donation");
        }
    }, []);

    return (
        <>
            <Sidebar />
            <div
                id='OutletComponent'
                className='w-full overflow-hidden'
            >
                <Outlet />
            </div>
        </>
    );
};

export default Dashboard;
