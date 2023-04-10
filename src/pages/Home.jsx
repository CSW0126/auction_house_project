import React from 'react'
import {motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio';
import state from '../store';
import {
    headContainerAnimation,
    headContentAnimation,
    headTextAnimation,
    slideAnimationHome
} from '../config/motion';
import { useNavigate  } from "react-router-dom";

import CustomButton from '../components/CustomButton';

const Home = () => {
    const snap = useSnapshot(state);
    let navigate  = useNavigate();
    const handleClick = () => {
        state.page = 'auction';
        navigate('/auction_house_project/auction')
    }
    return (
        <motion.section className="home" {...slideAnimationHome('left')}>

            <motion.header {...slideAnimationHome("down")}>
                <img 
                src='./logo.png'
                alt="logo"
                className="w-16 h-16 object-contain"
                />
            </motion.header>

            <motion.div className="home-content" {...headContainerAnimation}>
                <motion.div {...headTextAnimation}>
                <h1 className="head-text">
                    LET'S <br className="xl:block hidden" /> BID.
                </h1>
                </motion.div>
                <motion.div
                {...headContentAnimation}
                className="flex flex-col gap-5 z-10"
                >
                <p className="max-w-md font-normal text-gray-600 text-base">
                <strong>Giftify</strong> is an auction house that offers a collection of one-of-a-kind gifts, each with a unique story and history.
                </p>
                <p className='max-w-md font-normal text-gray-600 text-base'>
                From rare collectibles to <strong>unique</strong> artwork and jewelry, every item is special and unforgettable.
                </p>

                <CustomButton 
                    type="filled"
                    title="Bid It"
                    handleClick={() => handleClick()}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm z-30"
                />
                </motion.div>
            </motion.div>
        </motion.section>
    )
}

export default Home