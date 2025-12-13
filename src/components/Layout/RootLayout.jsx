import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Navbar/Navbar';

const RootLayout = () => {
    return (
        <div className='max-2-7xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default RootLayout;