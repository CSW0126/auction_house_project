import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { Collapse } from '@mui/material';
import state from '../store';
import { Ship } from '../config/constants';
import { fadeAnimation, slideAnimationForForm } from '../config/motion';
import  CustomButton  from '../components/CustomButton';
import {useNavigate} from 'react-router-dom';
import {useIsAuthenticated, useSignOut} from 'react-auth-kit';
import {AiOutlineClockCircle, AiOutlineUnorderedList} from 'react-icons/ai';
import {RiAuctionLine} from 'react-icons/ri';
import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io';
import moment from 'moment';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

import {RxExclamationTriangle} from 'react-icons/rx'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    // bgcolor: 'background.paper',
    p: 4,
    // borderRadius: 5,
  };

const Auction = () => {
    const snap = useSnapshot(state);
    const [fakeShip, setFakeShip] = useState(Ship);
    const [fakeRow, setFakeRow] = useState([  
        { 
            "Price": 200,    
            "Time": "2023-04-08 00:00:00",    
            "From": "u***r"  
        },  
        {    
            "Price": 190,    
            "Time": "2023-04-08 01:45:00",    
            "From": "a***m"  
        },  
        {    
            "Price": 180,    
            "Time": "2023-04-08 01:45:00",    
            "From": "b***c"  
        },  
        {    
            "Price": 170,    
            "Time": "2023-04-08 01:45:00",    
            "From": "d***d"  
        },  
        {    
            "Price": 150,    
            "Time": "2023-04-08 01:45:00",    
            "From": "a***a"  
        }]
    );
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(useIsAuthenticated())
    let navigate = useNavigate();
    const signOut = useSignOut()

    const [openModal, setOpenModal] = useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const bidBtn = () => {
        if(isAuthenticated){
            handleOpen();
        }else{
            enqueueSnackbar("You need to login to use this feature", {variant: "error"})
        }
    }

    const handleGoBidedItem = () => {
        state.page = 'otherGift';
        navigate('/otherGift');
    }

    const handleLogout = () => {
        signOut()
        setIsAuthenticated(false)
    }

    const handleSignIn = () => {
        state.page = 'signin';
        navigate('/signin');
    }

    const handleGoBack = () => {
        state.page = 'home';
        navigate('/home');
    }

    const handleGoProfile = () => {
        state.page = 'profile';
        navigate('/profile');
    }

    const handleConfirm = () => {
        enqueueSnackbar("Bid successfully", {variant: "success"})
        handleClose();
        const newPrice = fakeShip.price + 10;
        //update fakeship price
        setFakeShip({
            ...fakeShip,
            price: newPrice
        })

        //update faketable
        const newFakeRow = fakeRow;
        newFakeRow.unshift({
            "Price": newPrice,
            "Time": moment().format('YYYY-MM-DD HH:mm:ss'),
            "From": "u***r"
        })
        setFakeRow(newFakeRow);
    }

    const handleAcqItemClick = () => {
        state.page = 'bidedItem';
        navigate('/bidedItem');
    }


    return (

        <motion.section>    
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
                {isAuthenticated? ( 
                       
                    <>
                        <CustomButton 
                            type="filled"
                            title="All Products"
                            handleClick={() => handleGoBidedItem()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-2"
                        />
                        <CustomButton 
                            type="filled"
                            title="Profile"
                            handleClick={() => handleGoProfile()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-2"
                        />
                        <button className="relative bg-[#06B6D4] text-dark rounded-lg font-bold text-sm px-4 py-2.5 mr-2" onClick={()=>handleAcqItemClick()}>
                            <span className="inline-flex rounded-full bg-red-500 text-dark w-4 h-4 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"></span>
                            Acquired Item
                        </button>
                        
                            
                        <CustomButton 
                            type="filled"
                            title="Logout"
                            handleClick={() => handleLogout()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />

                    </>

                    ):(
                    <>
                        <CustomButton 
                            type="filled"
                            title="All Products"
                            handleClick={() => handleGoBidedItem()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-2"
                        />
                        <CustomButton 
                            type="filled"
                            title="Sign In"
                            handleClick={() => handleSignIn()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </>

                    )}

            </motion.div>

            

            <motion.div
                className='absolute z-10 top-[70%] md:top-[18%] md: right-[8%] max-w-[500px] md:max-w-[550px]'
                {...slideAnimationForForm}
            >
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-2xl mx-auto">
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold  text-gray-600 mb-2">
                        {Ship.title}
                    </div>

                    <div className=' text-xs sm:text-sm md:text-base lg:text-lg font-normal mb-4 sm:mb-6 text-[#04111d]'>
                        Product ID: #{Ship.id}
                    </div>

                    <div className=" text-xs  sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 text-justify">
                        {Ship.description}
                    </div>

                    <div className='border border-[#e3e3e3] p-5 flex text-[#646d75] mb-3'>
                        <AiOutlineClockCircle color='#646d75' size={'24px'}/>
                        &nbsp;&nbsp;Sale ends in {moment(Ship.endDate).format('DD-MMM-YYYY HH:mm:ss')}
                    </div>    
                    

                    <div className="flex flex-col sm:flex-col mb-4  border rounded p-5">
                        <div className="text-[0.65rem] sm:text-xs md:text-sm lg:text-base font-bold text-gray-500 mb-2 sm:mb-0">Current Price &nbsp;&nbsp;
                            <span className=' text-[0.5rem] sm:text-[0.65rem] md:text-xs lg:text-sm'>(Start price: $ {Ship.startPrice})</span>
                        </div>
                        <div className=" sm:mb-0 flex justify-between items-center">
                            <span className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold  text-[#04111d]'>
                                ${fakeShip.price}
                            </span>

                            <button 
                                onClick={()=>bidBtn()}
                                className="bg-[#06B6D4] hover:bg-[#06A4BF] text-white font-bold py-2 px-4 rounded flex items-center">Make Offer &nbsp;<RiAuctionLine />
                            </button>
                        </div>
                    </div>

                    <div className='mb-5 border rounded'>
                        <button className=" w-full flex h-[3rem] items-center justify-between text-dark px-4 py-2 rounded"
                            onClick={()=>setOpen(!open)}>
                            <div className='flex justify-center items-center'>                            
                                <AiOutlineUnorderedList/> &nbsp;&nbsp;
                                <span className="mr-2">History</span>
                            </div>

                            {open ? (<IoMdArrowDropup/>) : (<IoMdArrowDropdown/>)}
    
                        </button>  
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <div className='border flex justify-between items-center'>
                                <div className='flex-1 text-center font-semibold'>Price</div>
                                <div className=' flex-[2_2_0%] text-center font-semibold'>Time</div>
                                <div className='flex-1 text-center font-semibold'>From</div>
                            </div>
                            <div className='mt-2  overflow-scroll max-h-[10rem]'>
                                <TableContainer component={Paper}>
                                    <Table sx={{}} aria-label="simple table">
                                        <TableHead >
                                        </TableHead>
                                        <TableBody>
                                        {fakeRow.map((row, index) => (
                                            <TableRow
                                            key={index}
                                            sx={{}}
                                            >
                                                <TableCell  align="center">${row.Price}</TableCell>
                                                <TableCell align="center">{row.Time}</TableCell>
                                                <TableCell align="center">{row.From}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </motion.div>

            <motion.div>
                <div className='rounded'>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        onClose={handleClose}
                        closeAfterTransition
                        slots={{ backdrop: Backdrop }}
                        slotProps={{
                            backdrop: {
                                    timeout: 500,
                                },
                        }}
                    >
                        <Fade in={openModal}>
                        <Box sx={style}>

                            {/* <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold  text-gray-600 mb-2">
                                Make Offer
                            </div>
                            <Typography id="transition-modal-description" sx={{ mt: 2 }} className='max-w-md font-normal text-gray-600 text-base'>
                                Each bid will increase the price by <strong>10$</strong> of the current price. You can bid as many times as you want. 
                            </Typography>

                            <div style={{ fontSize: '12px', fontStyle: 'italic' }} className='mt-1'>
                                *The highest bidder will win the auction.
                            </div>

                            <div className='mt-2'>
                                New Price: <strong>${fakeShip.price + 10}</strong>
                            </div>

                            <div className='flex justify-start mt-5'>
                                <button
                                    className={`flex-1 rounded-md w-fit py-2.5 font-bold text-sm mr-2 bg-red-500 hover:bg-red-600 text-white`}
                                    onClick={() => handleClose()}
                                    >
                                    Cancel
                                </button>
                                <button
                                    className={`flex-1 rounded-md w-fit py-2.5 font-bold text-sm ml-2 bg-green-500 hover:bg-green-600 text-white`}
                                    onClick={() => handleConfirm()}
                                    >
                                    Confirm
                                </button>
                            </div> */}
                            <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                                <div className="md:flex items-center">
                                    <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                        <RxExclamationTriangle size={24}/>
                                    </div>
                                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                        <p className="font-bold">Confirm Your Offer</p>
                                        <p className="text-sm text-gray-700 mt-1 text-justify">
                                            Each bid will increase the price by <strong>10$</strong> of the current price. You can bid as many times as you want. 
                                        </p>
                                        <p className=" text-xs text-gray-700  text-justify italic my-3">
                                            *The highest bidder will win the auction.
                                        </p>
                                        <p className="text-sm text-gray-700 mt-1 text-justify">
                                            New Price: <strong>${fakeShip.price + 10}</strong>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                                    <button 
                                    className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                                    onClick={()=>handleConfirm()}
                                    >
                                        Confirm
                                    </button>
                                    <button 
                                    className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm mt-4
                                    md:mt-0 md:order-1"
                                    onClick={handleClose}
                                    >Cancel</button>
                                </div>
                            </div>
                        </Box>
                        </Fade>
                    </Modal>
                </div>
            </motion.div>
        </motion.section>




  )
}

export default Auction