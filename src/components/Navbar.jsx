import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { collection, getDocs, where, query } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { RiArrowDropDownLine } from "react-icons/ri";
import { auth, db } from "../config/firebaseconfig";

function Navbar({ searchQuery, handleSearchChange }) {
  const [user, setUser] = useState(null);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [pic, setPic] = useState(false);

  async function fetchData() {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        setUser(user);
        const usersQuery = query(collection(db, "users"), where("uid", "==", uid));
        const usersSnapshot = await getDocs(usersQuery);
        usersSnapshot.forEach((doc) => {
          setPic(doc.data().profileImage);
        });
      }
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <nav className="bg-white w-[1200px] mx-auto mt-3 shadow-sm p-4 flex items-center justify-between">
      <div className="text-[2rem] w-[6rem] font-bold text-gray-800">OLX</div>
      <div className="flex flex-grow mx-4">
        <input
          type="text"
          placeholder="Search for items..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>
      <div className="flex space-x-4">
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="flex">
                <button className="w-[3rem] h-[3rem] flex items-center justify-center hover:bg-blue-100 rounded-full">
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
                <button onClick={() => setProfileDropdown((prev) => !prev)}>
                  <RiArrowDropDownLine className="text-[1.4rem]" />
                </button>
              </div>
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-md rounded-md">
                  <Link to="/myads" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    My ads
                  </Link>
                  <Link to="/myfav" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Favourites & Saved searches
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    View Profile
                  </Link>
                  <Link to="/setting" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Setting
                  </Link>
                  <Link to="/chats" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Chats
                  </Link>
                  <button
                    onClick={() => auth.signOut()}
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
        ) : (
          <>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-blue-500 font-semibold w-[6rem] px-4 py-2 border border-blue-500 rounded-md hover:bg-blue-100"
            >
              Register
            </button>
            <button className="text-white bg-blue-500 font-semibold w-[6rem] px-4 rounded-md hover:bg-blue-600">
              <Link to="/login">+ Sell</Link>
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
