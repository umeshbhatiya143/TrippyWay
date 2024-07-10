import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux'
import { toggleLogin, toggleSignup } from "@/store/slices";
import Loader from '@/assets/loader.gif'
import Image from "next/image";

const Signup = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [isMatch, setIsMatch] = useState(true)
    const [isLoading, setIsLoading] = useState(false)


    // toastify
    const toastOptions = {
        position: "bottom-right",
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    }

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };


    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const requestData = {
            name: values.name,
            email: values.email,
            password: values.password
        };

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            const responseData = await response.json();

            if (response.ok) {
                toast.success('Your account has been created');
                setTimeout(() => {
                    dispatch(toggleSignup());
                    dispatch(toggleLogin());
                }, 1000);
            } else {
                toast.error(responseData.message || 'Failed to create account');
            }
        } catch (error) {
            console.error('Failed to register:', error);
            toast.error('Error registering account');
        } finally {
            setIsLoading(false); // Ensure loading is set to false regardless of the result
        }
    };

    const handleGoogleLoginSuccess = (response) => {
        // TODO: Handle Google login success here
    };

    const handleFacebookLoginSuccess = (response) => {
        // TODO: Handle Facebook login success here
    };

    const handleLoginFailure = (error) => {
        // TODO: Handle login failure here
    };


    useEffect(() => {
        if (values.confirmPassword !== "" && values.password !== values.confirmPassword) {
            setIsMatch(false);
        }
        else {
            setIsMatch(true);
        }

        console.log(values)
    }, [values])

    return (
        <section className="w-full flex justify-center items-center transition-all duration-1000 bg-black bg-opacity-70 h-screen">
            <div className="max-w-lg w-full bg-white p-10 m-2 rounded-lg border border-gray-200 flex flex-col items-center gap-4 justify-center">
                <div className="relative w-full flex justify-end">
                    <span
                        onClick={() => dispatch(toggleSignup())}
                        className="absolute -right-10 -top-10 z-1 p-2 flex justify-center items-center rounded-lg transition-all duration-300 bg-gray-100 hover:bg-dark-cyan hover:text-white cursor-pointer">
                        <RxCross2 size={20} />
                    </span>
                </div>
                <form className="flex flex-col w-full gap-2.5 -mt-10 items-center"
                    action=""
                    onSubmit={(e) => handleRegister(e)}>
                    <h3 className="text-2xl font-medium mb-10 text-deep-purple">Create an Account</h3>

                    {/* <div className={styles.user_type}>
                        <div className={usertType==="candidate" ? "candidate" : "candidate selected"} onClick={()=>setusertType("candidate")}>
                            <AiOutlineUser />Candidate
                        </div>
                        <div className={usertType==="candidate" ? "selected employer" : "employer"} onClick={()=>setusertType("employer")}>
                            <BiBriefcase />Employer
                        </div>
                    </div> */}
                    <div className="flex flex-col w-full gap-1.5">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            placeholder="username"
                            className="bg-gray-100 border-none p-2.5 rounded-lg"

                        />
                    </div>
                    <div className="flex flex-col w-full gap-1.5">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            placeholder="user@gmail.com"
                            className="bg-gray-100 border-none p-2.5 rounded-lg"

                        />
                    </div>
                    <div className="flex flex-col w-full gap-1.5">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            placeholder="********"
                            className="bg-gray-100 border-none p-2.5 rounded-lg"

                        />
                    </div>
                    <div className="flex flex-col w-full gap-1.5">
                        <label htmlFor="contact">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={values.confirmPassword}
                            onChange={handleChange}
                            placeholder="********"
                            className="bg-gray-100 border-none p-2.5 rounded-lg"

                        />
                        {isMatch === false && <p style={{ color: 'red' }}>*password and confirm password not matched</p>}
                    </div>

                    {isLoading === false ? <button type="submit" className="bg-button-color border-none rounded-lg p-3.5 text-white w-full transition-all duration-300 hover:bg-button-color-hover cursor-pointer">
                        Signup
                    </button>
                        :
                        <div className="w-20 h-20 relative">
                            <Image
                                alt='loader'
                                src={Loader}
                                layout='responsive'
                                objectFit='contain'
                                width={'100%'}
                                height={'100%'}
                            />
                        </div>}
                    {/* <div className="form-group">
            <GoogleLogin
              clientId="YOUR_GOOGLE_CLIENT_ID"
              buttonText="Login with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleLoginFailure}
              cookiePolicy={"single_host_origin"}
            />
            <FacebookLogin
              appId="YOUR_FACEBOOK_APP_ID"
              autoLoad={false}
              fields="name,email,picture"
              callback={handleFacebookLoginSuccess}
              cssClass="btn-facebook"
              textButton="Login with Facebook"
            />
          </div> */}
                </form>
                <div className="flex gap-1.5 text-sm items-center">
                    <p>Already have an account?</p>
                    <span className="cursor-pointer text-blue-700 transition-all duration-700" onClick={() => {
                        dispatch(toggleSignup())
                        dispatch(toggleLogin())
                    }}>
                        LogIn
                    </span>
                </div>
                <span className="border-t border-gray-200 w-full flex justify-center"><p className="bg-white px-5 -mt-3.5">or</p></span>
                <div className="flex gap-2.5 text-sm w-full">
                    <div className="flex-1 rounded-lg p-3.5 flex justify-center items-center gap-2.5 border transition-all duration-700 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white cursor-pointer">
                        <FaFacebookF /> Login via facebook
                    </div>
                    <div className="flex-1 rounded-lg p-3.5 flex justify-center items-center gap-2.5 border transition-all duration-700 border-red-600 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer">
                        <AiOutlineGoogle /> Login via Google
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </section>
    )
}

export default Signup