import React, {useState} from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CustomButton from '../components/CustomButton'
import { fadeAnimation, signInFormAnimation } from '../config/motion'
import { useNavigate  } from "react-router-dom";
import { useSnapshot } from 'valtio';
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import state from '../store';

const SignIn = () => {
    const snap = useSnapshot(state);
    const [error, setError] = useState('')
    const [showError, setShowError] = useState(false)
    let navigate = useNavigate();
    const signIn = useSignIn();

    const handleGoBack = () => {
        state.page = 'home';
        navigate('/auction_house_project/home');
    }

    const handleGoBidedItem = () => {
        state.page = 'otherGift';
        navigate('/auction_house_project/otherGift');
    }

    const handleGoAuction = () => {
        state.page = 'auction';
        navigate('/auction_house_project/auction');
    }

    const handleSignUp = () => {
        state.page = 'signup';
        navigate('/auction_house_project/signup');
    }

    const formik = useFormik({
        initialValues: {
          username: "",
          password: "",
        },
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
        
            // try {
            //     const url = process.env.REACT_APP_SERVER_HOST + '/user/signIn'
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
            //         let user = response.data.user
            //         user.record = []
            //         signIn({
            //             token: response.data.token,
            //             expiresIn: 360000,
            //             tokenType: "Bearer",
            //             authState: { user: user},
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
                        title="Sign Up"
                        handleClick={() => handleSignUp()}
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
            </motion.div>

            <motion.div
                className="absolute z-10 top-[28%] left-[30%]"
                {...signInFormAnimation}
            >
                <div className="relative flex flex-col justify-center overflow-hidden w-[600px] h-[600px]">
                    <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl text-black">
                        <h1 className="text-3xl font-semibold text-center">
                        Sign in
                        </h1>
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
                                    onChange={formik.handleChange}
                                    value={formik.values.username}
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
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
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mt-6">
                                <button 
                                type='submit'
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-cyan-500 rounded-md hover:bg-cyan-400 focus:outline-none focus:bg-cyan-400">
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </motion.section>
  )
}

export default SignIn