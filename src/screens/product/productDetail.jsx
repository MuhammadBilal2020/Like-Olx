import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Timestamp, collection, query, where, getDocs, } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';

import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { CiHeart } from 'react-icons/ci';
import { useEffect } from "react";
import { auth, db } from "../../config/firebaseconfig";


const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const { item } = location.state || {}; // Safely access `item`
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  
  

  if (!item) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">No Product Found</h1>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  // fetch data from cart 
useEffect(() => {


  const fetchCartItems = () => {
    const storedCart = localStorage.getItem('Cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    
    
  };


  fetchCartItems()
  
} , [])

  // go to profile 
  const goToProfile = (uid) => {
    navigate(`/postprofile/${uid}`);
  };

  // add yo cart 
  let addToCart = function (item) {
    // console.log(item);
     isitemInCart = cartItems.some((cartItem) => cartItem.id === item.id)
    console.log(cartItems);
    
    let updatedCart = isitemInCart ? cartItems.filter((cartItem) => cartItem.id !== item.id ) : [...cartItems ,item]
    setCartItems(updatedCart)


  localStorage.setItem("Cart" , JSON.stringify(updatedCart))
    


  }

  // carousel next 
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === item.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // carousel back 
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? item.images.length - 1 : prevIndex - 1
    );
  };


  return (
    <>
      <Navbar />
      <div className="py-3">
        <div className="prodetails flex justify-between flex-wrap sm:w-[69rem]  mx-auto mt-4">
          <div className="image-and-desc sm:w-[42rem] w-auto">

            {/* Product Image Carousel */}
            <div className="image bg-[#f6f6f6] rounded border mx-auto flex justify-center items-center relative">
              <div className="relative w-full sm:h-[30rem] h-[20rem] overflow-hidden flex justify-center items-center">
                {item.images && item.images.length > 0 ? (
                  <div
                    className="flex transition-all duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    {/* Featured Label */}
                    <h1 className="absolute sm:bg-[transparent] sm:text-black bg-[#ffce32] w-[5rem] py-1 top-[.2rem] left-[.75rem] flex justify-center items-center text-white rounded-md shadow-md z-10">
                      Featured
                    </h1>
                    {item.images.map((image, index) => (
                      <div key={index} className="flex-shrink-0 px-3 w-full h-full">
                        <div className="imgs">
                          <img
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="object-cover w-[30rem] sm:h-[29rem] h-[20rem] block mx-auto"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-200">
                    No Image Available
                  </div>
                )}
                {/* Prev/Next Buttons */}
                <button
                  className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                  onClick={goToPrevious}
                >
                  &#60;
                </button>
                <button
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
                  onClick={goToNext}
                >
                  &#62;
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {item.images.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full cursor-pointer ${currentIndex === index ? "bg-blue-500" : "bg-gray-400"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>


            {/* Product Details */}
            <div className="price-name-loc border-2 mt-8 px-4 bg-white py-4 rounded">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">Rs {item.price}</h1>
                <div  className={` cursor-pointer transition-all ${
                          cartItems.some((cartItem) => cartItem.id === item.id)
                            ? 'text-red-600'
                            : 'text-gray-700'
                        }`} onClick={() => addToCart(item)}>
                
                  <CiHeart className="text-2xl" />
                </div>
              </div>
              <h2 className="text-lg font-semibold mt-3">Title: {item.title}</h2>
              <div className="time flex justify-between items-center mt-1">
                <div>{item.location}</div>
                <div>
                  {item.postedAt instanceof Timestamp
                    ? dayjs(item.postedAt.toDate()).fromNow()
                    : "N/A"}
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="description bg-white border mt-6 px-4 py-4 rounded">
              <h2 className="text-lg font-semibold">Description</h2>
              <p>{item.description}</p>
            </div>
          </div>



          {/* User Details */}
          <div className="user-detail bg-white sm:w-[26rem] mx-auto w-[22.3rem] sm:mt-0 mt-5">
            <div className="prof border-2 rounded px-6 py-5">
              <h1 className="text-xl font-semibold">Listed by Private User</h1>
              <div className="flex justify-between mt-3 items-center">
                <div>
                  <img
                    src={item.profilePic|| "placeholder.jpg"}
                    alt="User"
                    className="w-20 h-20 object-cover rounded-full"
                  />
                </div>
                <div>
                  <h4>{item.username || "Anonymous"}</h4>
                  <p>Member Since Feb 2024</p>
                  <h4
                    onClick={() => goToProfile(item.uid)}
                    className="hover:text-blue-600 cursor-pointer"
                  >
                    See Profile...
                  </h4>
                </div>
              </div>
              <button className="mt-3 w-full bg-[#002f34] text-white py-2 rounded">
                Phone Number
              </button>
              <button
                className="mt-3 w-full bg-[#5fdae8] text-white py-2 rounded"
                onClick={() => goToChat(item.uid)}

              >
                Chat
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
