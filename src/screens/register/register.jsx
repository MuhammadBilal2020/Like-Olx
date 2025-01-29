import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { auth } from '../../config/firebaseconfig';
import { collection, addDoc, serverTimestamp, getDocs } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { db } from "../../config/firebaseconfig";
import Swal from 'sweetalert2';

import { FaUpload } from "react-icons/fa";
import handleImageUpload from '../../utils/cloudinaryUploader';




function Register() {

  let username = useRef('')
  let email = useRef('')
  let password = useRef('')
  let confirmPass = useRef('')
  let [user, setUser] = useState()
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);


  
       
   


  const handleUpload = async (e) => {
    const files = e.target.files;
    if (!files.length) return;


    setUploading(true);

    const uploadPreset = "olx_clone_profile_image"; // Replace with your preset
    const cloudName = "dpdxrs2pg"; // Replace with your cloud name

    const url = await handleImageUpload(files, uploadPreset, cloudName);
    setUploadedImages(url);

    setUploading(false);
  };
  // register user  and store data in firestore
  // Ensure this is imported

  let registerUser = async (event) => {
    event.preventDefault();

    if (password.current.value !== confirmPass.current.value) {
      console.error("Passwords do not match");
      return;
    }

    try {
      // Register user

      const postsSnapshot = await getDocs(collection(db, 'users'));
      const users = postsSnapshot.docs.map(doc => doc.data())

      let alreadyAUser = users.find((user => user.email === email.current.value))
      if (alreadyAUser) {
        console.log("email is already in use ");
        return
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      );
      const user = userCredential.user;
      console.log(userCredential);

      Swal.fire({
        title: "Registeration Success!",
        text: "You are register",
        icon: "success"
      });




      // Save user data to Firestore
      const docRef = await addDoc(collection(db, "users"), {
        email: email.current.value,
        username: username.current.value,
        password: password.current.value,
        uid: user.uid, // Use user.uid directly here
        createdAt: serverTimestamp(), // Add the timestamp here
        profileImage: uploadedImages


      });



      console.log(docRef);


      console.log("Document written with ID: ", docRef.id);
      username.current.value = ""
      password.current.value = ""
      email.current.value = ""
      confirmPass.current.value = ""



    } catch (error) {
      console.error("Error: ", error.code, error.message);
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white w-[28rem] rounded-lg shadow-lg p-8">
        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h1>

        {/* Form */}
        <form onSubmit={registerUser}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              ref={username}
              placeholder="Enter your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              ref={password}

              type="text"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="text"
              placeholder="Re-enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ref={confirmPass}
            />

            <div className="files justify-center flex gap-4 mt-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                id="fileUpload"
              />
              <label
                htmlFor="fileUpload"
                className="cursor-pointer flex gap-x-2 justify-center w-full p-3 border border-dashed border-gray-300 rounded-md text-center"
              >
                <div className="w-[2rem]">

                  <FaUpload className="block   text-blue-500 text-xl" />
                </div>
                {uploading ? "Uploading..." : "Select Profile Image"}
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button

            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 font-semibold"
          >
            Register
          </button>
        </form>


        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-500 hover:underline hover:text-blue-600 font-medium"
            >
              login
            </Link>
          </p>
        </div>

        {/* Alternate Options */}

      </div>
    </div>
  );
}

export default Register;
