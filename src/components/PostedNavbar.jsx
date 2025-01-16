import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostNavbar() {
  const navigate = useNavigate(); // React Router hook for navigation

  return (
    <nav className="bg-white  mx-auto  shadow-sm p-4 flex items-center justify-start">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="flex items-center text-[2.5rem] font-bold    hover:bg-blue-100"
      >
        ← 
      </button>

      {/* OLX Heading */}
      <div className="text-[2rem] font-bold text-gray-800 ms-4 ">
        OLX
      </div>
    </nav>
  );
}

export default PostNavbar;
