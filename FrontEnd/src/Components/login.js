import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux'
import { toggleLogin, toggleSignup, loginUser } from '@/store/slices';
import Loader from '@/assets/loader.gif'

import { jwtDecode } from 'jwt-decode';

const login = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
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

  const handleLogin = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to log in');
      }

      toast.success('You are successfully logged in');
      dispatch(loginUser());
      const decodedToken = jwtDecode(data.token);
      dispatch(loginUser({ userId: decodedToken.userId, token: data.token, cart: decodedToken.cart, bookings: decodedToken.bookings }));

      // router.push('/');
      setTimeout(() => {
        dispatch(toggleLogin());
        window.location.reload()

        if (values.email === "umesh@admin.com") {
          localStorage.setItem("adminLogin", true);
          router.push('/admin')
        }
      }, 1000);
    } catch (error) {
      console.error('Login error:', error.message);
      toast.error(error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
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


  return (
    <section className="w-full flex justify-center items-center transition-all duration-1000 bg-black bg-opacity-70 h-screen">
      <div className="max-w-lg w-full bg-white p-10 m-2 rounded-lg border border-gray-200 flex flex-col items-center gap-4 justify-center">
        <div className="relative w-full flex justify-end">
          <span
            onClick={() => dispatch(toggleLogin())}
            className="absolute -right-10 -top-10 z-1 p-2 flex justify-center items-center rounded-lg transition-all duration-300 bg-gray-100 hover:bg-dark-cyan hover:text-white cursor-pointer">
            <RxCross2 size={20} />
          </span>
        </div>
        <form className="flex flex-col w-full gap-2.5 -mt-10 items-center"
          onSubmit={handleLogin}>
          <h3 className="text-2xl font-medium mb-10 text-deep-purple">Welcome to TourWay</h3>
          {/* <img src="/logo.png" alt="Logo" className="h-14" /> */}
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="email" className="text-base">Email:</label>
            <input type="email" id="email" name="email" className="bg-gray-100 border-none p-2.5 rounded-lg" placeholder="user@gmail.com"
              required
              value={values.email} onChange={handleChange} />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="password" className="text-base">Password:</label>
            <input type="password" id="password" name="password" className="bg-gray-100 border-none p-2.5 rounded-lg" placeholder="Password..."
              required
              value={values.password} onChange={handleChange} />
          </div>
          <div className="flex justify-between w-full text-gray-600">
            <div className="flex gap-2.5 items-center">
              <input type="checkbox" id="remember-me" className="cursor-pointer" />
              <label htmlFor="remember-me" className="cursor-pointer">Remember me</label>
            </div>
            <div className="text-sm">
              <p>Forgot Password?</p>
            </div>
          </div>
          {isLoading === false ?
            <button type="submit" className="bg-button-color border-none rounded-lg p-3.5 text-white w-full transition-all duration-300 hover:bg-button-color-hover cursor-pointer">
              Login
            </button> :
            <div className="w-20 h-20 relative">
              <Image src={Loader} alt="loader" layout="fill" objectFit="contain" />
            </div>
          }
        </form>
        <div className="flex gap-1.5 text-sm items-center">
          <p>Don't have an account?</p>
          <span className="cursor-pointer text-blue-700 transition-all duration-700" onClick={() => { dispatch(toggleLogin()); dispatch(toggleSignup()); }}>
            Signup
          </span>
        </div>
        <div className="border-t border-gray-200 w-full flex justify-center">
          <p className="bg-white px-5 -mt-3.5">or</p>
        </div>
        <div className="flex gap-2.5 text-sm w-full">
          <div className="flex-1 rounded-lg p-3.5 flex justify-center items-center gap-2.5 border transition-all duration-700 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white cursor-pointer">
            <FaFacebookF /> Login via facebook
          </div>
          <div className="flex-1 rounded-lg p-3.5 flex justify-center items-center gap-2.5 border transition-all duration-700 border-red-600 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer">
            <AiOutlineGoogle /> Login via Google
          </div>
        </div>
      </div>
    </section>
  )
}

export default login