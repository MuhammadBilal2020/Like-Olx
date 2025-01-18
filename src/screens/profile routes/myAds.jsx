import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { collection, query, where, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { auth, db } from '../../config/firebaseconfig';
import { deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { HiOutlineDotsVertical } from "react-icons/hi";




const Myads = () => {
  const [postData, setPostData] = useState([]); // Array of posts
  const [activeDropdown, setActiveDropdown] = useState(null); // To track which dropdown is open
  const [filter, setFilter] = useState('All'); // Track current filter (All, Active, Inactive)

  // Fetch posts data
  const fetchUser = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        // Fetch posts data
        const postQuery = query(collection(db, "Posts"), where("uid", "==", uid));
        const postSnapshot = await getDocs(postQuery);
        const posts = postSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(posts);

        setPostData(posts);
      } else {
        console.log("No user is signed in.");
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const toggleDropdown = (index) => {
    setActiveDropdown((prev) => (prev === index ? null : index)); // Toggle dropdown for specific ad
  };



  const deActivate = async (adId) => {
    try {
      console.log(adId);

      const postRef = doc(db, "Posts", adId); // Fixed document reference
      await updateDoc(postRef, { status: 'Inactive' });
      // await deleteDoc(doc(db, "Posts", adId));
      console.log(`Ad ${adId} deactivated`);


      fetchUser(); // Re-fetch the data
    } catch (error) {
      console.error("Error deactivating ad:", error);
    }
  };

  const reActivate = async (adId) => {
    try {
      console.log(adId);

      const postRef = doc(db, "Posts", adId); // Fixed document reference
      await updateDoc(postRef, { status: 'Active' });
      // await deleteDoc(doc(db, "Posts", adId));
      console.log(`Ad ${adId} activated`);


      fetchUser(); // Re-fetch the data
    } catch (error) {
      console.error("Error deactivating ad:", error);
    }
  };

  let delAd = async function (adId){
    //  console.log(postData);
    
      await deleteDoc(doc(db, "Posts", adId));
      console.log(adId);
      
let remainData= postData.filter((item) => item.id !== adId)

setPostData([...remainData])

     console.log(remainData)
     

  }

  

  // Filter posts based on selected filter (Active, Inactive, or All)
  const filteredPosts = postData.filter(ad => filter === 'All' || ad.status === filter);
  console.log(filteredPosts);

  return (
    <>
      <Navbar />
      <div className='px-[9rem]'>
        <h1 className='mt-[2rem] text-[1.6rem] font-semibold'>Manage and View your Ads</h1>

        {/* Search */}
        <div className="search mt-3">
          <input
            type="text"
            placeholder="Search by Ad Title"
            className="border-[black] border-[1.6px] px-[.6rem] py-[.7rem] text-center w-[15rem]"
          />
        </div>

        {/* Filter Buttons */}
        {/* Filter Buttons */}
<div className='flex justify-between mt-5 w-[30rem]'>
  {['All', 'Active', 'Inactive'].map((currentFilter, index) => (
    <button
      key={index}
      className={`border-[1.6px] w-[9rem] px-[.3rem] py-[.3rem] rounded-full 
                  ${filter === currentFilter ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
      onClick={() => setFilter(currentFilter)} // Set the filter based on button click
    >
      <span className='text-[.9rem]'>{currentFilter} Ads</span>
      <span>({postData.filter(ad => currentFilter === 'All' || ad.status === currentFilter).length})</span>
    </button>
  ))}
</div>


        {/* Ads */}
        {filteredPosts.length > 0 ? (
          filteredPosts.map((item, index) => (
            <div className="Ads border-[1.5px] flex justify-between mt-10 p-3" key={item.id}>
              {/* Image */}
              <div className="img border-[1.5px] p-2 text-center w-[8rem] ">
                <img
                  src={Array.isArray(item.images) && item.images.length > 0 ? item.images[0] : "image"}
                  className='h-[7rem] w-[100%] object-cover mx-auto'
                  alt="Ad"
                />
              </div>

              {/* Info */}
              <div className="info w-[63.5rem]">
                <div className='flex justify-between'>
                  <div>
                    <p>
                      <span className='font-semibold text-[1.4rem]'>{item.title}</span>
                      &nbsp;
                      <span>-</span>
                      &nbsp;
                      <span>in mobile phones</span>
                    </p>
                  </div>
                  <div className="relative">
                    {/* Dropdown trigger */}
                    <p onClick={() => toggleDropdown(index)} className="cursor-pointer">
                      <HiOutlineDotsVertical className='text-[#313131]' />
                      </p>

                    {/* Dropdown */}
                    {activeDropdown === index && (
                      item.status === 'Inactive' ?
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-md rounded-lg z-10">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => deActivate(item.id)} // Pass ad ID
                          >
                            Deactivate
                          </button>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => reActivate(item.id)} // Pass ad ID
                          >
                            reactivate
                          </button>
                        </div>
                        :
                        <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-md rounded-lg z-10">
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => deActivate(item.id)} // Pass ad ID
                          >
                            Deactivate
                          </button>
                        </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className='flex justify-between mt-3 items-center w-[40rem]'>
                    <div>{item.price}</div>
                    <div>|</div>
                    <div>active from 7 jan to 6 jan</div>
                    <div>|</div>
                    <div className={`px-3 py-[3px] w-[5rem] text-center rounded ${item.status === 'Active' ? 'bg-green-200' : 'bg-red-200'}`}>
                      {item.status}
                    </div>
                  </div>
                </div>

                <div className='flex justify-between mt-3'>
                  <div className='flex justify-between w-[15rem]'>
                    <div>views</div>
                    <div>phone</div>
                    <div>chats</div>
                  </div>
{item.status === 'Inactive'   ? <div className='w-[18rem] gap-2 flex'>
                    
                    <button onClick={() => delAd(item.id)} className='w-[8rem] rounded bg-[red] py-2 px-4'>Remove Ad</button>
                    <button className='w-[7rem] rounded bg-[aqua] py-2 px-4'>Edit</button>

                   
                   </div> :
 <div className='w-[8rem] '>
                    
 <button className='w-[7rem] rounded bg-[aqua] py-2 px-4'>Edit</button>

</div>

}
                 
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1>No ads available</h1>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Myads;
