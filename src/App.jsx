import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import { collection, getDocs, Timestamp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { db } from './config/firebaseconfig';
import { CiHeart } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function App() {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [filteredData, setFilteredData] = useState([]); // Filtered data state

  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsSnapshot = await getDocs(collection(db, 'Posts'));
        const posts = postsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((post) => post.status !== "Inactive");
        setData(posts);
        setFilteredData(posts); // Initialize filteredData with all posts
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    const fetchCartItems = () => {
      const storedCart = localStorage.getItem('Cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    fetchData();
    fetchCartItems();
  }, []);

// Inside App component
const handleSearchChange = (query) => {
  setSearchQuery(query);
  if (query) {
    const filtered = data.filter((item) =>
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.cateName.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  } else {
    setFilteredData(data);
  }
};


  const goToDetail = (item) => {
    navigate(`/productDetail/${item.id}`, { state: { item } });
  };

  const handleHeartClick = (index, item) => {
    const isItemInCart = cartItems.some((cartItem) => cartItem.id === item.id);
    const updatedCart = isItemInCart
      ? cartItems.filter((cartItem) => cartItem.id !== item.id)
      : [...cartItems, item];
    
    setCartItems(updatedCart);
    localStorage.setItem('Cart', JSON.stringify(updatedCart));
  };

  const renderCategory = (category) => {
    const filteredItems = filteredData.filter((item) => item.cateName === category);

    return (
      <div className={`${category} mt-[2rem]`}>
        {filteredItems.length > 0 && (
          <>
            <h1 className="text-2xl font-bold mb-4 text-blue-600 bg-gray-100 px-4 py-2 rounded-md">
              {category} Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="border-[2px] sm:w-[300px] md:w-[350px] border-gray-300 shadow-lg rounded-lg hover:scale-105"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={
                        Array.isArray(item.images) && item.images.length > 0
                          ? item.images[0]
                          : 'https://via.placeholder.com/150'
                      }
                      className="h-full w-full object-cover"
                      alt={item.title}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <h2 className="font-bold text-lg text-gray-800">Rs {item.price}</h2>
                      <div
                        onClick={() => handleHeartClick(index, item)}
                        className={`flex items-center justify-center p-2 rounded-full cursor-pointer transition-all ${
                          cartItems.some((cartItem) => cartItem.id === item.id)
                            ? 'text-red-600'
                            : 'text-gray-700'
                        }`}
                        style={{ width: '2.5rem', height: '2.5rem' }}
                      >
                        <CiHeart className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-700 h-[1.8rem]">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 h-[2rem]" title={item.description}>
                      {item.description.slice(0, 50)}...
                    </p>
                    <p className="text-sm text-gray-500 h-[1.5rem]">
                      <span className="font-semibold">Location:</span> {item.location}
                    </p>
                    <p className="text-sm text-gray-500 h-[1.5rem]">
                      <span className="font-semibold">Category:</span> {item.cateName}
                    </p>
                    <p className="text-sm text-gray-500 h-[1.5rem]">
                      <span className="font-semibold">Seller:</span> {item.username}
                    </p>
                    <p className="text-sm text-gray-500 h-[1.5rem]">
                      <span className="font-semibold">Posted:</span>{' '}
                      {item.postedAt instanceof Timestamp
                        ? dayjs(item.postedAt.toDate()).fromNow()
                        : 'N/A'}
                    </p>
                    <button
                      onClick={() => goToDetail(item)}
                      className="ms-auto block px-[.6rem] py-[.5rem] rounded bg-blue-600 w-[6rem] hover:shadow-lg"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
     <Navbar handleSearchChange={handleSearchChange} />

      <div className="mt-8 px-4 max-w-6xl mx-auto">
       
        {renderCategory('Mobile')}
        {renderCategory('Bike')}
        {renderCategory('Car')}
      </div>
    </>
  );
}

export default App;
