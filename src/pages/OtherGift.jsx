import React from 'react'
import {motion} from 'framer-motion'
import {signInFormAnimation, fadeAnimation, headTextAnimation} from '../config/motion'
import CustomButton from '../components/CustomButton'
import state from '../store';
import { useSnapshot } from 'valtio';
import { useNavigate  } from "react-router-dom";
import { Ship, Island, Cup, Ball, Shiba } from '../config/constants';

const OtherGift = () => {
    const snap = useSnapshot(state);
    const [currentModel, setCurrentModel] = React.useState(Ship);
    let navigate  = useNavigate();

    const handleGoBack = () => {
        state.page = 'home';
        navigate('/auction_house_project/home');
    }

    const handleGoAuction = () => {
        state.page = 'auction';
        navigate('/auction_house_project/auction');
    }

    const updateSelectedModel = (model) => {
        state.show = model;
        switch (model) {
            case 'ship':
                setCurrentModel(Ship);
                break;
            case 'island':
                setCurrentModel(Island);
                break;
            case 'cup':
                setCurrentModel(Cup);
                break;
            case 'ball':
                setCurrentModel(Ball);
                break;
            case 'shiba':
                setCurrentModel(Shiba);
                break;
            default:
                setCurrentModel(Ship);
                break;
        }
    }

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
                    <CustomButton 
                        type="filled"
                        title="Auction"
                        handleClick={() => handleGoAuction()}
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
            </motion.div>

            <motion.div className='z-10'
                
            >
                <div className="model-selector">
                    <div onClick={() => updateSelectedModel("ship")}>
                        <img  src={'ship.jpg'} alt={Ship.title} />
                        <h4>{Ship.title}</h4>
                    </div>
                    <div onClick={() => updateSelectedModel("shiba")}>
                        <img  src={'shiba.jpg'} alt={Shiba.title} />
                        <h4>{Shiba.title}</h4>
                    </div>
                    <div onClick={() => updateSelectedModel("ball")}>
                        <img  src={'ball.jpg'} alt={Ball.title} />
                        <h4>{Ball.title}</h4>
                    </div>
                    <div onClick={() => updateSelectedModel("cup")}>
                        <img  src={'catcup.jpg'} alt={Cup.title} />
                        <h4>{Cup.title}</h4>
                    </div>
                    <div onClick={() => updateSelectedModel("island")}>
                        <img src={'island.jpg'} alt={Island.title} />
                        <h4>{Island.title}</h4>
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="absolute z-10 bottom-5 right-[48%]"
            >
                <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 md:p-10 lg:p-12 w-full max-w-2xl mx-auto">
                    <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold  text-gray-600 mb-2">
                        {currentModel.title}
                    </div>

                    <div className=' text-xs sm:text-sm md:text-base lg:text-lg font-normal mb-4 sm:mb-6 text-[#04111d]'>
                        Product ID: #{currentModel.id}
                    </div>

                    {currentModel.title === 'Ship in Bottle' ?
                        (<div className="bg-green-500 text-white w-20 h-20 flex justify-center items-center absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                            <span className="text-lg font-bold">On Sale</span>
                        </div>):
                        (
                            <div className="bg-red-500 text-white w-20 h-20 flex justify-center items-center absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                                <span className="text-lg font-bold">SOLD</span>
                            </div> 
                        )
                    }

                    <div className=" text-xs  sm:text-sm md:text-base lg:text-lg text-gray-600 mb-4 sm:mb-6 text-justify">
                        {currentModel.description}
                    </div>
                </div>
            </motion.div>

            


        </motion.section>
    )
}

export default OtherGift