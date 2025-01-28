import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { collection, getDocs, where, query } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { FaBars } from "react-icons/fa";
import { LiaSellsy } from "react-icons/lia";
import { GrFavorite } from "react-icons/gr";
import { MdOutlinePerson } from "react-icons/md";
import { FaBuysellads } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";



import { auth, db } from "../config/firebaseconfig";
import { RiArrowDropDownLine } from "react-icons/ri";
import Swal from "sweetalert2";

function Navbar({ searchQuery, handleSearchChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null); // Tracks the logged-in user
  const [profileDropdown, setProfileDropdown] = useState(false); // Profile dropdown state
  const [pic, setPic] = useState(false); // Profile dropdown state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => setIsSidebarOpen(true);
  const closeSidebar = () => setIsSidebarOpen(false);

  let navigate = useNavigate();

  function signOuts() {
    signOut(auth)
      .then(() => {
        Swal.fire({
          text: "Successfully signed out",
          icon: "success"
        }).then(() => {

          window.location.reload();
        });
      })
      .catch((error) => {
        console.error("Error during signout:", error);
      });
  }

  async function fetchData() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user)
        // Get blogs data from Firestore 
        const users = query(collection(db, "users"), where("uid", "==", uid));
        const blogsSnapshot = await getDocs(users);
        blogsSnapshot.forEach((doc) => {

          setPic(doc.data().profileImage)

        });


      } else {
        console.log("no data");
      }
    });
  }

  useEffect(() => {
    fetchData()
  }, [])



  return (
    <>
      <nav className="bg-white   mx-auto mt-3 shadow-sm p-4 flex items-center justify-between">
        {/* Left: OLX Heading */}
        <div onClick={openSidebar} className="bar sm:hidden flex items-center  w-[2rem] h-[2rem] "> <FaBars className="text-[1rem]" /></div>

        <div className="sm:text-[2rem] text-[1.6rem] sm:w-[6rem] w-[4rem] font-bold text-gray-800">OLX</div>

        {/* Center: Search Bar */}
        <div className="flex flex-grow mx-4">
          <input
            type="text"
            placeholder="Search for items..."
            className=" w-full  px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />

        </div>

        {/* Right: Conditional Buttons */}
        <div className="flex space-x-4">
          {user ? (
            <>
              {/* Profile Dropdown */}
              <div className=" sm:flex hidden  items-center space-x-4">
                <div className="relative">
                  <div className="flex">
                    <button

                      className="w-[3rem] h-[3rem] flex items-center justify-center hover:bg-blue-100 rounded-full"
                    >
                      {pic ? (
                        <img
                          src={pic}
                          className="w-[2rem] h-[2rem] rounded-full object-cover"
                          alt="Profile"
                        />
                      ) : (
                        <span className="bg-black w-[2rem] h-[2rem] rounded-full"></span>
                      )}
                    </button>
                    <button><RiArrowDropDownLine onClick={() => setProfileDropdown((prev) => !prev)} className="text-[1.4rem]" /></button>

                  </div>
                  {profileDropdown && (
                    <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md">
                      <Link
                        to="/myads"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        My ads
                      </Link>
                      <Link
                        to="/myfav"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Favourites & Saved searches
                      </Link>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        View Profile
                      </Link>
                      <Link
                        to="/setting"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Setting
                      </Link>
                      <Link
                        to="/chats"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Chats
                      </Link>
                      <button
                        onClick={signOuts}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
                <button className="text-white bg-blue-500 font-semibold w-[6rem] px-4 py-2 rounded-md hover:bg-blue-600">
                  <Link to="/postad">+ Sell</Link>
                </button>
              </div>

            </>
          ) : (
            <>
              {/* Login/Registration Modal */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-blue-500 sm:block hidden  font-semibold w-[6rem] px-4 py-2 border border-blue-500 rounded-md hover:bg-blue-100"
              >
                Register
              </button>
              <button className="text-white sm:block hidden  bg-blue-500 font-semibold w-[6rem] px-4  rounded-md hover:bg-blue-600">
                <Link to={'/login'}>+ Sell</Link>
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
          <div className="bg-[#f6f6f6] rounded-lg p-8 w-96 shadow-lg">
            <h2 className="text-[1.5rem] font-bold text-center text-gray-800 mb-2">OLX</h2>
            <div className="flex flex-col space-y-4 mb-6">
              <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Login with Google
              </button>
            </div>
            <div className="flex items-center mb-6">
              <hr className="flex-grow border-gray-300" />
              <span className="px-4 text-gray-500">or</span>
              <hr className="flex-grow border-gray-300" />
            </div>
            <div className="flex flex-col space-y-4">
              <Link
                to="/register"
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Register with Email
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Login
              </Link>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full py-2 text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isSidebarOpen &&
        <div className="fixed inset-0 bg-gray-800 bg-opacity-90 z-50 flex flex-col">
          {/* Top bar with close button */}
          <div className="flex justify-between items-center p-4 bg-white text-white shadow-md">

            <button
              onClick={closeSidebar}
              className="text-[1.5rem] font-semibold"
            >
              <IoCloseOutline  className="text-[black] text-[2rem]"/>
            </button>
          </div>
          

          {/* Sidebar content */}
          <div className="p-4 text-white flex items-center justify-center min-h-screen ">
            {user ? (
              <div className="w-[35rem] h-[30rem] ">
               <hr />
               <Link to="/postad" className=" text-[1.3rem] flex items-center justify-start gap-x-2 px-3 py-2  "><span><LiaSellsy /></span>  <span>Start Selling</span></Link>
               <Link to="/myfav" className=" text-[1.3rem] flex items-center justify-start gap-x-2 px-3 py-2  "><span><GrFavorite /></span>  <span>Favourites & Saved searches</span></Link>
               <Link to="/profile" className=" text-[1.3rem] flex items-center justify-start gap-x-2 px-3 py-2  "><span><MdOutlinePerson /></span>  <span>Profile</span></Link>
               <Link to="/myads" className=" text-[1.3rem] flex items-center justify-start gap-x-2 px-3 py-2  "><span><FaBuysellads /></span>  <span>My Ads</span></Link>
               <Link to="/setting" className=" text-[1.3rem] flex items-center justify-start gap-x-2 px-3 py-2  "><span><IoMdSettings /></span>  <span>Setting</span></Link>

               <div className="mt-5 px-3">
               <button
                        onClick={signOuts}
                        className="block w-[7rem]  bg-blue-500  px-4 py-2 "
                      >
                        Logout
                      </button>
               </div>






             </div>


            )
              :
              (
                <div className="absolute bottom-58 w-full flex flex-col items-center">
                  {/* Login Button */}
                  <Link
                    to="/login"
                    className="w-80 block text-center bg-blue-900 text-white p-3 rounded-lg shadow-md hover:bg-blue-800 transition"
                  >
                    Login
                  </Link>
                  {/* Create Account Button */}
                  <Link
                    to="/create-account"
                    className="w-80 block text-center bg-blue-900 text-white p-3 rounded-lg shadow-md mt-4 hover:bg-blue-800 transition"
                  >
                    Create New Account
                  </Link>
                </div>
              )}
          </div>

        </div>


      }
    </>
  );
}

export default Navbar;
