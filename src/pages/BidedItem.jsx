import React,{useEffect, useState} from 'react'
import {motion} from 'framer-motion'
import {signInFormAnimation, fadeAnimation,slideAnimation, headTextAnimation} from '../config/motion'
import CustomButton from '../components/CustomButton'
import state from '../store';
import { useSnapshot } from 'valtio';
import { useNavigate  } from "react-router-dom";
import Tab from '../components/Tab';
import MsgBox from '../components/MsgBox';
import { useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ColorPicker from '../components/ColorPicker';

import {RxExclamationTriangle} from 'react-icons/rx'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 'auto',
    // background transparent
    bgcolor: 'transparent',
  };

const BidedItem = () => {
    const snap = useSnapshot(state);
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [deliveryMsg, setDeliveryMsg] = useState(snap.fakeUser.address)
    const [cusMsg , setCusMsg] = useState("");
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [shipState, setShipState] = useState(false);

    let navigate  = useNavigate();

    useEffect(() => {
        state.cusState = false
        state.deliveryState = false
    }, [])

    useEffect(() => {
        if(shipState){
            enqueueSnackbar("No more editing is allowed after confirm shipments. " , { variant: 'error' });
        }
        console.log("activeEditorTab", activeEditorTab)
        if(activeEditorTab == "ColorPicker"){
            state.ColorPickerOn = true
        }else{
            state.ColorPickerOn = false
        }

    }, [activeEditorTab])

    useEffect(() => {
        console.log(snap.ColorPickerOn)
    }, [snap])

    const handleGoBack = () => {
        setActiveEditorTab("");
        state.page = 'home';
        navigate('/home');
    }

    const handleGoAuction = () => {
        setActiveEditorTab("");
        state.page = 'auction';
        navigate('/auction');
    }

    const handleGoProfile = () => {
        setActiveEditorTab("");
        state.page = 'profile';
        navigate('/profile');
    }

    const handleSubmit = (item) => {
        if (item === "Delivery") {
            state.deliveryState = true;  
            enqueueSnackbar("Delivery Address set. " , { variant: 'success' });
        }else if (item === "Customize") {
            state.cusState = true;
            enqueueSnackbar("Message received. We will call your for more customization details." , { variant: 'confirm' });
        }
        setActiveEditorTab("");

    }

    const EditorTabs = [
        {
            name: "ColorPicker",
            icon: 'swatch.png',
        },
        {
          name: "Customize",
          icon: 'file.png',
        },
        {
          name: "Delivery",
          icon: 'delivery.png',
        },
      ];

    const handleConfirmShipments = () => {
        handleClose();
        setActiveEditorTab("");
        setShipState(true);
        enqueueSnackbar("Your shipment is confirmed. " , { variant: 'success' });
    }

      const generateTabContent = () => {
        if(!shipState){
            switch (activeEditorTab) {
            case "Delivery":
                return <MsgBox 
                    key={"1"}
                    prompt={deliveryMsg}
                    setPrompt={setDeliveryMsg}
                    handleSubmit={handleSubmit}
                    name={activeEditorTab}
                    msg="Please enter your delivery address..."
                />

                case "Customize":
                    return <MsgBox
                        key={"2"}
                        prompt={cusMsg}
                        setPrompt={setCusMsg}
                        handleSubmit={handleSubmit}
                        name={activeEditorTab}
                        msg="Please enter your customize message..."
                    />
                case "ColorPicker":
                    return <ColorPicker />

            default:
                return null;
            }
        }else{
            // enqueueSnackbar("No more editing is allowed after confirm shipments. " , { variant: 'error' });
            return null;
        }
      }

    const handleTabClick = (tabName) => {
        if(tabName != activeEditorTab){
            setActiveEditorTab(tabName);
        }else{
            setActiveEditorTab("")
        }

    }


    return (
        <motion.section>
            <motion.div
                className="absolute z-20 top-5 left-5"
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
                <CustomButton
                    type="filled"
                    title="Profile"
                    handleClick={() => handleGoProfile()}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-2"
                />

                <CustomButton
                    type="filled"
                    title="Auction"
                    handleClick={() => handleGoAuction()}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
            </motion.div>

            <motion.div
                className="absolute top-0 left-0 z-10"
                {...slideAnimation('left')}
            >
                <div className="flex items-center min-h-screen">
                    <div className="editortabs-container tabs">
                        {EditorTabs.map((tab) => (
                            <Tab 
                                key={tab.name}
                                tab={tab}
                                handleClick={() => handleTabClick(tab.name)}
                                okState={tab.name === "Delivery" ? state.deliveryState : state.cusState}
                            />
                        ))}
                        {generateTabContent()}
                    </div>
                </div>
            </motion.div>

            <motion.div
                className='filtertabs-container'
                {...slideAnimation("up")}
            >
                <button 
                    className="bg-green-500 hover:bg-green-600 text-dark rounded-lg font-bold text-sm px-4 py-2.5 transition-colors duration-300 ease-in-out"
                    onClick={handleOpen}
                    disabled={shipState}
                >
                {shipState ? "Please 3-7 working days for delivery." :"Confirm Shipments"}
                </button>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                    <Box sx={style}>
                        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
                            <div className="md:flex items-center">
                                <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                    <RxExclamationTriangle size={24}/>
                                </div>
                                <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                <p className="font-bold">Confirm Your Shipment</p>
                                <p className="text-sm text-gray-700 mt-1">You cannot make more changes after you confirm your shipment.
                                </p>
                                </div>
                            </div>
                            <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                                <button 
                                className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
                                onClick={handleConfirmShipments}
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
          </motion.div>

          {/* <motion.div>
            <ColorPicker  />
          </motion.div> */}

        </motion.section>
    )
}

export default BidedItem