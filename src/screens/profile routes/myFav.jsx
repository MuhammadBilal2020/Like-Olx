import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import { CiHeart } from 'react-icons/ci'; // Ensure correct icon import

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Footer from '../../components/Footer';

dayjs.extend(relativeTime);

const MyFav = () => {
  const [cartItems, setCartItems] = useState([]);  // Items stored in the cart (localStorage)
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [filteredData, setFilteredData] = useState([]); // Filtered data state

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('Cart')) || [];
    setCartItems(storedItems);
    setFilteredData(storedItems);  // Initialize filteredData with cart items
  }, []);

  const handleHeartClick = (item) => {
    const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
    setCartItems(updatedCartItems);
    localStorage.setItem('Cart', JSON.stringify(updatedCartItems));
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = cartItems.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.cateName.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(cartItems); // Reset filtered data when search query is cleared
    }
  };

  const isItemLiked = (item) => {
    return !cartItems.some(cartItem => cartItem.id === item.id);
  };

  return (
    <>
      <Navbar handleSearchChange={handleSearchChange} />
      <div className="px-[10.3rem]">
        <h1 className="text-[1.4rem] font-semibold">Favourites & Saved searches</h1>
        <div className="flex gap-6">
          {filteredData.length > 0 ? filteredData.map((item, index) => (
            <div key={index} className="border-[2px] w-[20rem] mt-2 border-gray-300 shadow-lg rounded-lg overflow-hidden">
              <div className="h-40 overflow-hidden">
                <img
                  src={Array.isArray(item.images) && item.images.length > 0
                    ? item.images[0]
                    : 'https://via.placeholder.com/150'}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="desc p-3">
                <div className="flex justify-between">
                  <div>
                    <h1 className="font-bold">{item.price}</h1>
                  </div>
                  <div
                    onClick={() => handleHeartClick(item)}
                    className={`cursor-pointer text-2xl ${isItemLiked(item) ? 'text-gray-500' : 'text-red-500'}`}
                  >
                    <CiHeart />
                  </div>
                </div>
                <div>
                  <p>{item.description}</p>
                  <p>{item.title}</p>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-gray-600 mb-2 h-[2rem]" title={item.description}>
                    {item.description.slice(0, 50)}...
                  </p>
                  <p className="text-sm text-gray-500 h-[1.5rem]">
                    <span className="font-semibold">Posted:</span>{' '}
                    {item.postedAt ? dayjs(item.postedAt).fromNow() : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          )) : <h1>No items in your favourites</h1>}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyFav;
