import { AnimatePresence,motion } from 'framer-motion'
import React, {useState, useEffect} from 'react'
import axios, { AxiosError } from 'axios';
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import {signUpFormAnimation, fadeAnimation} from '../config/motion'
import CustomButton from '../components/CustomButton'
import state from '../store';
import { useSnapshot } from 'valtio';
import { useNavigate  } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';
import { Collapse } from '@mui/material';
import { BiMenu } from 'react-icons/bi';

const SignUp = () => {
    const snap = useSnapshot(state);
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const navigate = useNavigate();
    const signIn = useSignIn();

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


    const handleGoBack = () => {
        state.page = 'home';
        navigate('/auction_house_project/home');
    }

    const handleGoAuction = () => {
        state.page = 'auction';
        navigate('/auction_house_project/auction');
    }

    const handleSignIn = () => {
        state.page = 'signin';
        navigate('/auction_house_project/signin');
    }

    const handleGoBidedItem = () => {
        state.page = 'otherGift';
        navigate('/auction_house_project/otherGift');
    }

    const validate = values => {
        const errors = {};
        if (!values.username) {
          errors.username = '';
        } else if (values.username.length < 5) {
          errors.username = 'Must be 5 characters or more';
        }
      
        if (!values.password) {
          errors.password = '';
        } else if (values.password.length < 5) {
          errors.password = 'e.g. 12345';
        }
      
        if (!values.confirmPassword) {
          errors.confirmPassword = '';
        } else if (values.password != values.confirmPassword) {
          errors.confirmPassword = 'Password Not match';
        }
      
        return errors;
    };

    const formik = useFormik({
        initialValues: {
          username: "",
          password: "",
          confirmPassword: ""
        },
        // validate,
        onSubmit : async (values) => {
            console.log("Values: ", values);
            setError("");

            //TEMP
            let user = {
                name: "test",
            }
            signIn({
                token: "test",
                expiresIn: 360000,
                tokenType: "Bearer",
                authState: { user: user},
            });
            state.page = 'auction';
            navigate('/auction_house_project/auction')
        },
    });

    return (
        <motion.section
            className='signin'
            {...signUpFormAnimation}
        >
            <motion.div
                className="absolute z-10 top-5 left-5"
                {...fadeAnimation}
            >
                <CustomButton 
                    type="outline"
                    title={<AiOutlineHome size={18}/>}
                    handleClick={() => handleGoBack()}
                    customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                />
            </motion.div>

            <motion.div
                    className="absolute z-10 top-5 right-5"
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
                            <CustomButton 
                                type="filled"
                                title="Auction"
                                handleClick={() => handleGoAuction()}
                                customStyles="w-full px-4 py-2.5 font-bold text-sm mt-2"
                            />
                            <CustomButton 
                                type="filled"
                                title="Sign In"
                                handleClick={() => handleSignIn()}
                                customStyles="w-full px-4 py-2.5 font-bold text-sm mt-2"
                            />
                            </div>
                        </Collapse>
                    </>:
                    <>
                        <CustomButton 
                            type="filled"
                            title="All Products"
                            handleClick={() => handleGoBidedItem()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-2"
                        />
                        <CustomButton 
                            type="filled"
                            title="Auction"
                            handleClick={() => handleGoAuction()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm mr-2"
                        />
                        <CustomButton 
                            type="filled"
                            title="Sign In"
                            handleClick={() => handleSignIn()}
                            customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                        />
                    </>}

            </motion.div>
            <motion.div
                className="absolute z-10  top-[20rem] left-[10%] sm:top-[10rem] sm:left-[8%] md:left-[18%] md:top-[10rem] lg:left-[30%] lg:top-[10rem] xl:top-[28%] xl:left-[30%]"
            >
                <div className="relative flex flex-col justify-center overflow-hidden w-fit h-fit sm:w-[600px] sm:h-[600px]">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl text-black">
                        <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
                        {showError ? (                
                                <div>
                                    <p className="text-red-600 font-semibold">Auth Fail</p>
                                </div>
                            ):(
                                <></>
                            )}

                        <form className="mt-6" onSubmit={formik.handleSubmit}>
                            <div className="mb-2">
                                <label
                                    htmlFor="username"
                                    className="block text-sm font-semibold text-gray-800"
                                >Username
                                </label>
                                <input
                                    name='username'
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                />
                                {formik.errors.username ? <div><p className='mt-2 text-xs text-red-600'>{formik.errors.username}</p></div> : null}
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-gray-800"
                                >Password
                                </label>
                                <input
                                    name='password'
                                    type="password"
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.errors.password ? <div><p className='mt-2 text-xs text-red-600'>{formik.errors.password}</p></div> : null}
                            </div>
                            <div className="mb-2">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-semibold text-gray-800"
                                >Confirm Password
                                </label>
                                <input
                                    name='confirmPassword'
                                    type="password"
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    onChange={formik.handleChange}
                                    value={formik.values.confirmPassword}
                                />
                                {formik.errors.confirmPassword ? <div><p className='mt-2 text-xs text-red-600'>{formik.errors.confirmPassword}</p></div> : null}
                            </div>
                            <div className="mt-6">
                                <button 
                                    type='submit'
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-500 rounded-md hover:bg-cyan-400 focus:outline-none focus:bg-cyan-400">
                                    Create Account
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>


        </motion.section>

    )
}

export default SignUp