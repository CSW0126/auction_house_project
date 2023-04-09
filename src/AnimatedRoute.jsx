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
                <Route path="/auction_house_project/" element={<Home />} />
                <Route path="/auction_house_project/signin" element={<SignIn />} />
                <Route path="/auction_house_project/signup" element={<SignUp />} />


                <Route path="/auction_house_project/auction" element={
                    <Auction/>
                } />

                <Route path="/auction_house_project/otherGift" element={
                    <OtherGift/>
                } />

                <Route path="/auction_house_project/bidedItem" element={
                    <RequireAuth loginPath='/auction_house_project/signin'>
                        <BidedItem/>
                    </RequireAuth>

                } />

                <Route path="/auction_house_project/profile" element={
                    <RequireAuth loginPath='/auction_house_project/signin'>
                        <Profile/>
                    </RequireAuth> 
                } />

                <Route path="*" element={<Navigate to="/auction_house_project/" />} />
            </Routes>
            <Canvas key={'ship_canvas'}/>
        </AnimatePresence>

  )
}

export default AnimatedRoute