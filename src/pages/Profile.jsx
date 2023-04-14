import React, {useState,  useEffect} from 'react'
import {motion} from 'framer-motion'
import {signInFormAnimation, fadeAnimation} from '../config/motion'
import CustomButton from '../components/CustomButton'
import state from '../store';
import { useSnapshot } from 'valtio';
import { useNavigate  } from "react-router-dom";
import { Canvas } from '@react-three/fiber';
import { useSnackbar } from 'notistack';
import { BiMenu } from 'react-icons/bi';
import { Collapse } from '@mui/material';
import { AiOutlineHome } from 'react-icons/ai';

import { OrbitControls } from '@react-three/drei';
import useSpline from '@splinetool/r3f-spline'
import Spline from '@splinetool/react-spline';
import MetaMaskBtn from '../components/MetaMaskBtn';



const Profile = () => {
    const snap = useSnapshot(state);
    const { enqueueSnackbar } = useSnackbar();
    let navigate  = useNavigate();

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);
    const [correctNetwork, setCorrectNetwork] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        setInnerWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
  
      // Clean up the event listener on unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const [menuOpen, setMenuOpen] = useState(false);
    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
      };

    const handleGoBidedItem = () => {
        state.page = 'otherGift';
        navigate('/auction_house_project/otherGift');
    }

    const handleGoBack = () => {
        state.page = 'home';
        navigate('/auction_house_project/home');
    }

    const handleGoAuction = () => {
        state.page = 'auction';
        navigate('/auction_house_project/auction');
    }

    const handleAcqItemClick = () => {
        state.page = 'bidedItem';
        navigate('/auction_house_project/bidedItem');
    }


    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        state.fakeUser = {
            ...state.fakeUser,
            [name]: value,
        };
    };

    const renderNFT =(props={}) =>{
        const {nodes, materials} = useSpline('https://prod.spline.design/guuXvrnmY9qTKAKk/scene.splinecode')
        console.log(nodes, materials)
        return(
            <Spline scene="https://prod.spline.design/guuXvrnmY9qTKAKk/scene.splinecode" className='w-fit h-fit'/>
        )
    }

    const handleCorrect =() =>{
        setCorrectNetwork(true);
    }
    return (
        <motion.section
            className='signin'
            {...signInFormAnimation}
        >
            <motion.div
                    className="absolute z-20 top-5 left-5"
                    {...fadeAnimation}
                >
                    <CustomButton 
                        type="outline"
                        title={<AiOutlineHome size={18} />}
                        handleClick={() => handleGoBack()}
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
            </motion.div>

            <motion.div
                    className="absolute z-20 top-5 right-5"
                    {...fadeAnimation}
                >
                    {innerWidth <= 960 ? 
                        <>
                            <div className='flex flex-row justify-end'>                        
                                <button className=" items-end  bg-[#06B6D4] text-dark rounded-lg font-bold text-sm px-4 py-2.5 mr-2" onClick={()=>handleMenuToggle()}>
                                    <BiMenu size={24}/>
                                </button>
                            </div>  
                            <Collapse in={menuOpen} timeout="auto" unmountOnExit className=''>
                                <div className='mt-5 grid grid-cols-1'>
                                    <CustomButton 
                                        type="filled"
                                        title="All Products"
                                        handleClick={() => handleGoBidedItem()}
                                        customStyles="w-full px-4 py-2.5 font-bold text-sm mt-2"
                                    />
                                    <button className="relative bg-[#06B6D4] text-dark rounded-lg font-bold text-sm px-4 py-2.5 mt-2" onClick={()=>handleAcqItemClick()}>
                                        <span className="inline-flex rounded-full bg-red-500 text-dark w-4 h-4 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"></span>
                                        Acquired Item
                                    </button>
                                    <CustomButton 
                                        type="filled"
                                        title="Auction"
                                        handleClick={() => handleGoAuction()}
                                        customStyles="w-full px-4 py-2.5 font-bold text-sm mt-2"
                                    />
                                </div>
                            </Collapse>
                        </>
                        :
                        <>
                            <CustomButton 
                                type="filled"
                                title="All Products"
                                handleClick={() => handleGoBidedItem()}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-2"
                            />
                            <button className="relative bg-[#06B6D4] text-dark rounded-lg font-bold text-sm px-4 py-2.5 mr-2" onClick={()=>handleAcqItemClick()}>
                                <span className="inline-flex rounded-full bg-red-500 text-dark w-4 h-4 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"></span>
                                Acquired Item
                            </button>
                            <CustomButton 
                                type="filled"
                                title="Auction"
                                handleClick={() => handleGoAuction()}
                                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                            />
                        </>}

            </motion.div>

            <motion.div
                className="z-10 absolute w-auto flex flex-col justify-center items-center py-4 gap-4 h-screen ml-5"
            >
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-2xl font-bold mb-4">{snap.fakeUser.username}</div>
                    <div className="flex flex-col md:flex-row mb-4">
                        <div className="md:w-1/3 font-bold">Contact Number:</div>
                        <div className="md:w-2/3">
                        <input
                            type="text"
                            name="contactNumber"
                            value={snap.fakeUser.contactNumber}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                        />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mb-4">
                        <div className="md:w-1/3 font-bold">Contact Email:</div>
                        <div className="md:w-2/3">
                        <input
                            type="text"
                            name="contactEmail"
                            value={snap.fakeUser.contactEmail}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                        />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mb-4">
                        <div className="md:w-1/3 font-bold">Name:</div>
                        <div className="md:w-2/3">
                        <input
                            type="text"
                            name="name"
                            value={snap.fakeUser.name}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                        />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row mb-4">
                        <div className="md:w-1/3 font-bold">Address:</div>
                        <div className="md:w-2/3">
                            <textarea
                            name="address"
                            value={snap.fakeUser.address}
                            onChange={handleInputChange}
                            className="w-full border rounded-lg p-2"
                            rows="5"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-[#06B6D4] text-dark rounded-lg font-bold text-sm px-4 py-2.5" onClick={() => enqueueSnackbar("Account updated", {variant: "success"})}>Save</button>
                    </div>
                </div>
            </motion.div>
            
            <motion.div
                {...fadeAnimation}
            >
                <div className="bg-white rounded-lg shadow-md p-6 z-10 absolute w-[700px] h-[700px] right-10 top-1/2 transform -translate-y-1/2">
                    <div className="flex flex-col justify-center items-center py-4 gap-4 h-[550px] mb-4">
                        <MetaMaskBtn  handleCorrect={()=>handleCorrect()}/>
                        {/* <div className="text-2xl font-bold mb-4">Mint your NFT!</div> */}
                        {correctNetwork ?
                        (                        
                        <button className="block mx-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md focus:outline-none focus:shadow-outline">
                            Mint
                        </button>):
                        
                        (<></>)}

                        <div className='w-[500px] h-[500px]'>
                            {renderNFT()}
                        </div>

                    </div>
                </div>

            </motion.div>
        </motion.section>
    )
}

export default Profile