import { AnimatePresence,motion } from 'framer-motion'
import React, {useState} from 'react'
import axios, { AxiosError } from 'axios';
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import { useNavigate  } from "react-router-dom";
import {signUpFormAnimation, fadeAnimation} from '../config/motion'
import CustomButton from '../components/CustomButton'
import state from '../store';
import { useSnapshot } from 'valtio';

const SignUp = () => {
    const snap = useSnapshot(state);
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    const signIn = useSignIn();
    let navigate  = useNavigate();

    const handleGoBack = () => {
        state.page = 'home';
        navigate('/home');
    }

    const handleSignIn = () => {
        state.page = 'signin';
        navigate('/signin');
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
            navigate('/auction')
        
            // try {
            //     const url = process.env.REACT_APP_SERVER_HOST + '/user/signUp'
            //     const body = {
            //         username : values.username,
            //         password: values.password
            //     }
            //     const response = await axios.post(
            //         url,
            //         body
            //     );
            //     console.log(response)
        
            //     if (response.data.status == 'success'){
            //         signIn({
            //             token: response.data.token,
            //             expiresIn: 360000,
            //             tokenType: "Bearer",
            //             authState: { user: response.data.user},
            //           });
            //         navigate('/')
            //     }else{
            //         console.log('error')
            //         setError(response.data.status)
            //     }
            // } catch (err) {
            //   if (err && err instanceof AxiosError)
            //     setError(err.response?.data.message);
            //   else if (err && err instanceof Error) setError(err.message);
        
            //   console.log("Error: ", err);
            //   setShowError(true)
            // }
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
                        title="Sign In"
                        handleClick={() => handleSignIn()}
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
            </motion.div>
            <motion.div
                className="absolute z-10 top-[28%] left-[30%]"
            >
                <div className="relative flex flex-col justify-center overflow-hidden w-[600px] h-[600px]">
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