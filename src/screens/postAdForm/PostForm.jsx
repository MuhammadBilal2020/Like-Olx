import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarForm from "./form components/car";
import BikeForm from "./form components/bike";
import MobileForm from "./form components/mobile";
import PostNavbar from '../../components/PostedNavbar';
import { collection, addDoc, query, where, getDocs } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { auth, db } from "../../config/firebaseconfig";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

const PostForm = () => {
  const { cateName } = useParams();
  const [username, setUsername] = useState("");
  const [uid, setUid] = useState("");
  let [profilePic ,setProfilePic] = useState()

  const fetchData = async (user) => {
    try {
      const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          
          setUsername(doc.data().username);
          setProfilePic(doc.data().profileImage);
        });
      } else {
        console.error("No matching user document found.");
      }
    } catch (error) {
      console.error(`Error fetching user data: ${error}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        fetchData(user);
      } else {
        console.error("No user is logged in.");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const pushData = async (data) => {
    const dataWithTimestamp = {
      ...data,
      username,
      uid,
      cateName,
      profilePic,
      timestamp: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, "Posts"), dataWithTimestamp);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <PostNavbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="w-full max-w-4xl mx-auto bg-white p-8 shadow-md rounded-lg">
          {cateName === "Car" && <CarForm onSubmit={pushData} cateName={cateName} username={username} uid={uid} />}
          {cateName === "Bike" && <BikeForm onSubmit={pushData} cateName={cateName} username={username} uid={uid} />}
          {cateName === "Mobile" && <MobileForm onSubmit={pushData} cateName={cateName} username={username} uid={uid} />}
        </div>
      </div>
    </>
  );
};

export default PostForm;
