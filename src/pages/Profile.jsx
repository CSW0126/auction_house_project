import React from 'react'
import {motion} from 'framer-motion'
import {signInFormAnimation, fadeAnimation} from '../config/motion'
import CustomButton from '../components/CustomButton'
import state from '../store';
import { useSnapshot } from 'valtio';
import { useNavigate  } from "react-router-dom";
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useSnackbar } from 'notistack';

const Profile = () => {
    const snap = useSnapshot(state);
    const { enqueueSnackbar } = useSnackbar();
    let navigate  = useNavigate();

    const handleGoBack = () => {
        state.page = 'home';
        navigate('/home');
    }

    const handleGoAuction = () => {
        state.page = 'auction';
        navigate('/auction');
    }

    const handleAcqItemClick = () => {
        state.page = 'bidedItem';
        navigate('/bidedItem');
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
    return (
        <motion.section
            className='signin'
            {...signInFormAnimation}
        >
            <motion.div
                    className="absolute z-10 top-5 left-5"
                    {...fadeAnimation}
                >
                    <CustomButton 
                        type="filled"
                        title="Home"
                        handleClick={() => handleGoBack()}
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
            </motion.div>

            <motion.div
                    className="absolute z-10 top-5 right-5"
                    {...fadeAnimation}
                >
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
            </motion.div>

            <motion.div
                className="z-10 absolute w-auto flex flex-col justify-center items-center py-4 gap-4 h-screen"
            >
                <div className="bg-white rounded-lg shadow-md p-6">

                    {/* <div className="flex flex-col md:flex-row mb-4">
                        <div className="md:w-1/3 font-bold">Balance:</div>
                        <div className="md:w-2/3 font-bold">
                            ${snap.fakeUser.balance.toFixed(2)}
                        </div>
                    </div>

                    <div className="flex justify-end mb-4">
                        <button
                            className="bg-blue-500 text-white rounded-lg px-4 py-2 mr-4"
                            onClick={() => handleWithdraw(1000)}
                        >
                            Withdraw $1000
                        </button>
                        <button
                            className="bg-blue-500 text-white rounded-lg px-4 py-2"
                            onClick={() => handleDeposit(1000)}
                        >
                            Deposit $1000
                        </button>
                    </div> */}

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
            
        </motion.section>
    )
}

export default Profile