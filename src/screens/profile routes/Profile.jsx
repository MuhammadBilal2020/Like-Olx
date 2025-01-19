import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, Timestamp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { db, auth } from '../../config/firebaseconfig';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import Navbar from '../../components/Navbar';
import { CiHeart } from 'react-icons/ci';
import dayjs from 'dayjs';  // Importing dayjs to handle relative time
import relativeTime from 'dayjs/plugin/relativeTime';
import Footer from '../../components/footer';



dayjs.extend(relativeTime);


const Profile = () => {
  const [userData, setUserData] = useState(null); // Single user data
  const [postData, setPostData] = useState([]); // Array of posts
  const [searchQuery, setSearchQuery] = useState(''); // Search query state
  const [filteredData, setFilteredData] = useState([]); // Filtered data state
  const [profilePic, setProfilePic] = useState([]); // Filtered data state


  const fetchUser = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        // Fetch user data
        const userQuery = query(collection(db, "users"), where("uid", "==", uid));
        const userSnapshot = await getDocs(userQuery);
        const userData = userSnapshot.docs.map((doc) => doc.data()); // First result
        console.log(userData);
        setProfilePic(userData[0].profileImage)


        setUserData(userData);

        // Fetch posts data
        const postQuery = query(collection(db, "Posts"), where("uid", "==", uid));
        const postSnapshot = await getDocs(postQuery);
        const posts = postSnapshot.docs.map((doc) => doc.data());
        console.log(posts);
        setFilteredData(posts)

        setPostData(posts);
      } else {
        console.log("No user is signed in.");
      }
    });
  };


  const handleSearchChange = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = postData.filter((item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.cateName.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(postData); // Reset filtered data when search query is cleared
    }
  };



  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar handleSearchChange={handleSearchChange} />

      <div className="profile px-[10.3rem] py-[1.4rem] flex justify-between">
        <div>
          <div className="w-[10rem] h-[10rem] px-[.3rem] py-[.3rem] rounded-full border border-gray-300 flex items-center justify-center overflow-hidden">
            <img src={profilePic} className="w-full h-full rounded-full object-cover" alt="Profile" />
          </div>
          <div className="showads w-[9rem]">
            <p className="font-semibold mt-4 text-center">
              {postData.length} ads published
            </p>
          </div>
        </div>

        <div className="w-[58rem]">
          <h1 className="font-semibold text-[2.7rem]">
            {userData ? userData.name : "Unknown User"}
          </h1>
          <hr />
        </div>
      </div>

      <div className="posts px-[10.3rem] flex flex-wrap  gap-6 justify-center ">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div className=" px-[1.3rem] ">

              <div key={index} className="border-2 w-[20rem] h-[23rem] mt-10 border-gray-300 shadow-lg rounded-lg overflow-hidden">
                {/* Image Section */}
                <div className="h-[12rem] overflow-hidden">
                  <img
                    src={
                      Array.isArray(item.images) && item.images.length > 0
                        ? item.images[0]
                        : 'https://via.placeholder.com/150'
                    }
                    className="h-full w-full object-cover"
                    alt="Product"
                  />
                </div>

                {/* Description Section */}
                <div className="desc px-4 py-2 h-[11.2rem]  justify-between">
                  {/* Price and Heart Icon */}
                  <div className="flex justify-between items-center h-[2.5rem]">
                    <h1 className="font-bold text-lg">{item.price}</h1>
                    <div className="text-xl">
                      <CiHeart />
                    </div>
                  </div>

                  {/* Title */}
                  <div className="h-[2.4rem] mt-4">
                    <p className="text-md font-semibold text-gray-800">{item.title}</p>
                  </div>

                  {/* Location and Date Section */}
                  <div className="mt-2 text-sm h-[3rem]">
                    <p className="text-gray-500">{item.location}</p>
                    <p className="text-gray-500">
                      {item.postedAt instanceof Timestamp
                        ? dayjs(item.postedAt.toDate()).fromNow()
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>


            </div>
          ))
        ) : (
          <h1>No posts available</h1>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
