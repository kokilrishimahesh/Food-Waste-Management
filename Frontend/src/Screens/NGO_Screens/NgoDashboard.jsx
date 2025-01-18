import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "../Dashboard/Dashboard.css"
import NGO_Sidebar from './NGO_Sidebar/NGO_Sidebar';

const NgoDashboard = () => {
    
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');

        if (!isLoggedIn) {
            navigate('/login');
        }else{
            navigate("/ngo/trackDonations")
        }
    }, []);

    return (
        <>
            <NGO_Sidebar />
            <div
                id='OutletComponent'
            >
                <Outlet />
            </div>
        </>
    );
};

export default NgoDashboard;
