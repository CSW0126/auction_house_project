import React from 'react'
import { Routes, Route, Navigate,useLocation   } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';
import Home from "./pages/Home"
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Profile from './pages/Profile';
import Auction from './pages/Auction';
import OtherGift from './pages/OtherGift';
import BidedItem from './pages/BidedItem';

import Canvas from './canvas';

import {AnimatePresence } from 'framer-motion';


const AnimatedRoute = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />


                <Route path="/auction" element={
                    <Auction/>
                } />

                <Route path="/otherGift" element={
                    <OtherGift/>
                } />

                <Route path="/bidedItem" element={
                    <RequireAuth loginPath='/signin'>
                        <BidedItem/>
                    </RequireAuth>

                } />

                <Route path="/profile" element={
                    <RequireAuth loginPath='/signin'>
                        <Profile/>
                    </RequireAuth> 
                } />

                {/* <Route path="*" element={<Navigate to="/" />} /> */}
            </Routes>
            <Canvas key={'ship_canvas'}/>
        </AnimatePresence>

  )
}

export default AnimatedRoute