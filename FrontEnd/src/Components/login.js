import React, { useState } from 'react'
import { FaFacebookF } from 'react-icons/fa';
import { AiOutlineGoogle } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux'
import { setShowLogin, setShowSignup } from '@/store/slices';

const login = () => {
  const dispatch = useDispatch()

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false)

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Password is required", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Username is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    if (handleValidation()) {
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })
      let response = await res.json()

      if (response.success) {
        toast.success('You are successfully logged in', toastOptions);
        dispatch(login())

        //decode token data and store in the redux store
        try {
          const decodedToken = jwt.verify(response.token, jwtsecret);
          dispatch(setUserData(decodedToken))
          // console.log(decodedToken)
        } catch (error) {
          console.error('Token verification failed:', error.message);
        }

        router.push('/')
        setTimeout(() => {
          // window.location.reload()

          // dispatch(setShowLogin())
        }, 3000)

      } else {
        toast.error('User not found!', toastOptions);
      }
    }

    dispatch(setShowLogin())
    setIsLoading(false)
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
          onClick={() => dispatch(setShowLogin())}
          className="absolute -right-10 -top-10 z-1 p-2 flex justify-center items-center rounded-lg transition-all duration-300 bg-gray-100 hover:bg-dark-cyan hover:text-white cursor-pointer">
            <RxCross2 size={20} />
          </span>
        </div>
        <form className="flex flex-col w-full gap-2.5 -mt-10 items-center">
          <h3 className="text-2xl font-medium mb-10 text-deep-purple">Welcome to TrippyWay</h3>
          {/* <img src="/logo.png" alt="Logo" className="h-14" /> */}
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="email" className="text-base">Email:</label>
            <input type="email" id="email" name="email" className="bg-gray-100 border-none p-2.5 rounded-lg" placeholder="user@gmail.com" value={values.email} onChange={handleChange} />
          </div>
          <div className="flex flex-col w-full gap-1.5">
            <label htmlFor="password" className="text-base">Password:</label>
            <input type="password" id="password" name="password" className="bg-gray-100 border-none p-2.5 rounded-lg" placeholder="Password..." value={values.password} onChange={handleChange} />
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
            <div className="w-12 h-12 relative">
              <Image src={Loader} alt="loader" layout="fill" objectFit="contain" />
            </div>
          }
        </form>
        <div className="flex gap-1.5 text-sm items-center">
          <p>Don't have an account?</p>
          <span className="cursor-pointer text-blue-700" onClick={() => { dispatch(setShowLogin()); dispatch(setShowSignup()); }}>
            Signup
          </span>
        </div>
        <div className="border-t border-gray-200 w-full flex justify-center">
          <p className="bg-white px-5 -mt-3.5">or</p>
        </div>
        <div className="flex gap-2.5 text-sm w-full">
          <div className="flex-1 rounded-lg p-3.5 flex justify-center items-center gap-2.5 border transition-all duration-1000 border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white cursor-pointer">
            <FaFacebookF /> Login via facebook
          </div>
          <div className="flex-1 rounded-lg p-3.5 flex justify-center items-center gap-2.5 border transition-all duration-1000 border-red-600 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer">
            <AiOutlineGoogle /> Login via Google
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </section>
  )
}

export default login