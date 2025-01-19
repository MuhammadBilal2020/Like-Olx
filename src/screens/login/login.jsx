import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

import { auth } from '../../config/firebaseconfig';
import Swal from 'sweetalert2';

function Login() {
  let email = useRef('')
  let password = useRef('')

  let navigate = useNavigate()
// login user 
function loginUser(event){
event.preventDefault()


  signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    Swal.fire({
            title: "login successful",
            text: "You are login",
            icon: "success"
          });Swal.fire({
            title: "login successful",
            text: "You are login",
            icon: "success"
          });
    navigate('/')
    console.log(user);
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    console.log(errorCode);
    
    
  });
}

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-[28rem] rounded-lg shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h1>

        {/* Form */}
        <form onSubmit={loginUser}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              ref={email}

              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              ref={password}
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 font-semibold"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center mt-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-2 text-gray-500 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social Login Options */}
        <div className="mt-6 flex flex-col space-y-3">
          <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>
        
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-500 hover:underline hover:text-blue-600 font-medium"
            >
              Register
            </Link>
          </p>
        </div> 
      </div>
    </div>
  );
}

export default Login;
