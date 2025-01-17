import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/footer'
import { collection, query, where, getDocs, updateDoc, doc } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js';
import { auth, db } from '../../config/firebaseconfig';


const Setting = () => {
let oldPassRef = useRef("")
let newPassRef = useRef("")
let conformNewPassRef = useRef("")
let [u , setu] = useState('')

  // fetch  curent user data 
  const fetchUser = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;

        // Fetch posts data
        const postQuery = query(collection(db, "users"), where("uid", "==", uid));
        const postSnapshot = await getDocs(postQuery);
        const users = postSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(users);
        setu(users)

        // setPostData(posts);
      } else {
        console.log("No user is signed in.");
      }
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);


  let updatePassword = async function (e) {
    e.preventDefault();
  
    let uPass = u[0].password;
    let oldPass = oldPassRef.current.value;
    let newPass = newPassRef.current.value;
    let confirmNewPass = conformNewPassRef.current.value;
    console.log("New Password:", newPass);
    console.log("Confirm New Password:", confirmNewPass);
    if (uPass === oldPass) {
      console.log("Correct old password");
  
      if (confirmNewPass === newPass) {
        const userPasswordDoc = doc(db, "users", u[0].id); // Correct document reference
  
        try {
          await updateDoc(userPasswordDoc, {
            password: newPass,
          });
          console.log("Password updated successfully");
          oldPassRef.current.value = ""
          newPassRef.current.value = ""
          conformNewPassRef.current.value = ""

        } catch (error) {
          console.error("Error updating password:", error);
        }
      } else {
        console.log("New password and confirmation do not match");
      }
    } else {
      console.log("Old password is incorrect");
    }
  };
  
  

  return (
    <>
      <Navbar />

      <div className='setting px-[10.3rem] py-[1.4rem] flex justify-between'>

        <div className='w-[7rem]'>
          <button>Privacy</button>
          <br />
          <button>Notifications</button>
        </div>

        <div className='w-[67rem]'>

          <div>

            <div className='border px-[1.4rem] py-[.8rem] rounded'>

              <h1 className='text-[1.2rem] font-bold'>My ads Settings</h1>

            </div>


          </div>


          <div className='password mt-10'>

            <div className='border px-[1rem] rounded py-[1rem]'>
              <h1 className='font-semibold text-[1.2rem]'>Create Password</h1>
            </div>


            <div className='px-[2rem] py-[2rem] border'>
              
             <form onSubmit={updatePassword}>
             <input type="text" placeholder='Enter Old Password'
             ref={oldPassRef}
             className='border  w-full px-[1rem] py-[.6rem]' />
             
           
             
             <input type="text" placeholder='New Password'
             ref={newPassRef} className='border mt-8 w-full px-[1rem] py-[.6rem]' />
            
              <input type="text" ref={conformNewPassRef} placeholder='Create New Password' className='border mt-8 w-full px-[1rem] py-[.6rem]' />

            
              <button type='submit'   className='mt-8 bg-gray-200 w-[9rem] px-[.8rem] py-[.8rem] rounded'>
                Create Password
                </button>

             </form>

            </div>
            

          </div>


        </div>


      </div>


      <Footer />

    </>
  )
}

export default Setting