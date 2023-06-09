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
import { Shoe, TShirt } from '../config/constants';
import { reader } from '../config/helper';

import {RxExclamationTriangle} from 'react-icons/rx'
import FilePicker from '../components/FilePicker';
import AIPicker from '../components/AIPicker';
import { AiOutlineHome } from 'react-icons/ai';

import { BiMenu } from 'react-icons/bi';
import { Collapse } from '@mui/material';

import { Configuration, OpenAIApi } from 'openai';

const ShoeTab = [{
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
    ]

const TShirtTab = [
    {
        name: "AI Helper",
        icon: 'ai.png',
    },

    {
        name: "Upload Logo",
        icon: 'upload.png',
    },
    {
        name: "Textures",
        icon: 'texture.png',
    },
    {
        name: "Logo",
        icon: 'logo-tshirt.png',
    },
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
    ]

const BidedItem = () => {
    const snap = useSnapshot(state);
    const [file, setFile] = useState('');
    const [activeEditorTab, setActiveEditorTab] = useState("");
    const [generatingImg, setGeneratingImg] = useState(false);
    const [deliveryMsg, setDeliveryMsg] = useState(snap.fakeUser.address)
    const [cusMsg , setCusMsg] = useState("");
    const [aiMsg , setAiMsg] = useState("Create a gradient pattern that goes from blue to red");
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [shipState, setShipState] = useState(false);
    const [currentModel, setCurrentModel] = useState(Shoe);
    const [EditorTabs, setEditorTabs] = useState(snap.myItemShow == "shoe" ? ShoeTab : TShirtTab);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'auto',
        // background transparent
        bgcolor: 'transparent',
      };
    
      const stylePhone = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        // transform: 'translate(-50%, -50%)',
        width: 'auto',
        // background transparent
        bgcolor: 'transparent',
      };
    let navigate  = useNavigate();

    const [innerWidth, setInnerWidth] = useState(window.innerWidth);

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

    useEffect(() => {
        state.cusState = false
        state.deliveryState = false
    }, [])

    useEffect(() => {
        if(shipState){
            enqueueSnackbar("No more editing is allowed after confirm shipments. " , { variant: 'error' });
        }
        // console.log("activeEditorTab", activeEditorTab)
        if(activeEditorTab == "ColorPicker"){
            state.ColorPickerOn = true
        }else{
            state.ColorPickerOn = false
        }

    }, [activeEditorTab])

    useEffect(() => {
        console.log(snap.logoDecal)
    }, [snap])

    useEffect(() => {
        if(snap.myItemShow == "shoe"){
            setEditorTabs(ShoeTab);
        }else{
            setEditorTabs(TShirtTab);
        }
    }, [currentModel])

    const handleGoBack = () => {
        setActiveEditorTab("");
        state.page = 'home';
        navigate('/auction_house_project/home');
    }

    const handleGoAuction = () => {
        setActiveEditorTab("");
        state.page = 'auction';
        navigate('/auction_house_project/auction');
    }

    const handleGoProfile = () => {
        setActiveEditorTab("");
        state.page = 'profile';
        navigate('/auction_house_project/profile');
    }

    const callOpenAI = async (type, prompt) => {
        try{
            setGeneratingImg(true);
            const config = new Configuration({
                apiKey: import.meta.env.VITE_OpenAI_KEY,
            })
            // console.log("HI",import.meta.env.VITE_OpenAI_KEY)
            delete config.baseOptions.headers['User-Agent'];
            const openai = new OpenAIApi(config);

            const response = await openai.createImage({
                prompt,
                n:1,
                size: '1024x1024',
                response_format:'b64_json'
            })
            // console.log(response.data.data[0].b64_json)
            const img = response.data.data[0].b64_json
            // console.log(img)
            handleDecals(type, `data:image/png;base64,${img}`)
            

        }catch(err){
            console.log(err)
        }finally{
            setGeneratingImg(false);
            setActiveEditorTab("");
        }
    }

    const handleSubmit = (item) => {
        if (item === "Delivery") {
            state.deliveryState = true;  
            enqueueSnackbar("Delivery Address set. " , { variant: 'success' });
            setActiveEditorTab("");
        }else if (item === "Customize") {
            state.cusState = true;
            enqueueSnackbar("Message received. We will call you for more customization details." , { variant: 'confirm' });
            setActiveEditorTab("");
        }

        if(item == 'logo'){
            if(!aiMsg) enqueueSnackbar("Please enter your AI Prompt" , { variant: 'error' });
            console.log("AI logo")
            callOpenAI(item, aiMsg)


        }else if (item == 'full'){
            if(!aiMsg) enqueueSnackbar("Please enter your AI Prompt" , { variant: 'error' });
            console.log("AI full")
            callOpenAI(item, aiMsg)

        }

    }

    const handleConfirmShipments = () => {
        handleClose();
        setActiveEditorTab("");
        setShipState(true);
        enqueueSnackbar("Your shipment is confirmed. " , { variant: 'success' });
    }

    const handleDecals = (type, result) => {
        if (type == 'logo'){
            state.logoDecal = result;
        }else if(type == 'full'){
            state.fullDecal = result;
        }
      }

    const readFile = (type) => {
        reader(file)
          .then((result) => {
            handleDecals(type, result);
            setActiveEditorTab("");
          })
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

                case "AI Helper":
                    return <AIPicker
                    prompt={aiMsg}
                    setPrompt={setAiMsg}
                    generatingImg={generatingImg}
                    handleSubmit={handleSubmit}
                    />
                case "Upload Logo":
                    return <FilePicker 
                        file={file}
                        setFile={setFile}
                        readFile={readFile}
                    />
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

        if (tabName == 'Logo'){
            console.log(snap.isLogoTexture)
            if (snap.isLogoTexture){
                state.isLogoTexture = false;
                enqueueSnackbar('Logo function is Off. ' , { variant: 'default' });
            }else{
                state.isLogoTexture = true;
                enqueueSnackbar('Logo function is On' , { variant: 'info' });
            }
        }

        if (tabName == 'Textures'){
            console.log(snap.isLogoTexture)
            if (snap.isFullTexture){
                state.isFullTexture = false;
                enqueueSnackbar('Full Textures function is Off. ' , { variant: 'default' });
            }else{
                state.isFullTexture = true;
                enqueueSnackbar('Full Textures function is On' , { variant: 'info' });
            }
        }

    }

    const updateSelectedModel = (model) => {
        state.myItemShow = model;
        setActiveEditorTab("");
        switch (model) {
            case 'shoe':
                setCurrentModel(Shoe);
                break;
            case 'TShirt':
                setCurrentModel(TShirt);
                break;
            default:
                setCurrentModel(Shoe);
                break;
        }
    }

    return (
        <motion.section>
            <motion.div
                className="absolute z-20 top-5 left-10 sm:left-[6rem]"
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
                                title="Profile"
                                handleClick={() => handleGoProfile()}
                                customStyles="w-full px-4 py-2.5 font-bold text-sm mt-2"
                            />

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
                </>}
            </motion.div>

            <motion.div className='z-10'
                
                >
                    <div className="model-selector">
                        <div onClick={() => updateSelectedModel("shoe")}>
                            <img  src={'shoe.jpg'} alt={Shoe.title} />
                            <h4>{Shoe.title}</h4>
                        </div>
                        <div onClick={() => updateSelectedModel("TShirt")}>
                            <img  src={'TShirt.jpg'} alt={TShirt.title} />
                            <h4>{TShirt.title}</h4>
                        </div>

                    </div>
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
                                okState={
                                    tab.name == "Delivery" ? snap.deliveryState :
                                        tab.name == "Customize" ? snap.cusState :
                                            tab.name == "Logo" ? snap.isLogoTexture :
                                                tab.name == "Textures" ? snap.isFullTexture : false
                                }
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
                {shipState ? "Please wait for delivery." :"Confirm Shipments"}
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
                    <Box sx={innerWidth <=960 ? stylePhone : style}>
                        <div className="bg-white rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0  mb-[15rem] md:mb-4 mx-4 md:relative">
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