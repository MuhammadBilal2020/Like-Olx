import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { serverTimestamp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
import handleImageUpload from "../../../utils/cloudinaryUploader";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const BikeForm = ({ onSubmit, cateName, username, uid }) => {
  const titleRef = useRef("");
  const companyRef = useRef("");
  const descriptionRef = useRef("")
  const priceRef = useRef("")
  const locationRef = useRef("")
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  let navigate = useNavigate()



// let handleUpload = async (e) => {
//   let files = e.target.files
//   if (!files.length) return;

//   setUploading(true)
//   console.log(files);
  
//   const uploadPreset = "olx_uploads"; // Replace with your preset
//     const cloudName = "dpdxrs2pg";

//     const urls = await handleImageUpload(files, uploadPreset, cloudName);
//     setUploadedImages((prev) => [...prev , ...urls])
//     setUploading(false);

// }

const handleUpload = async (e) => {
  const files = e.target.files;
  if (!files.length) return;


  setUploading(true);

  const uploadPreset = "olx_uploads"; // Replace with your preset
  const cloudName = "dpdxrs2pg"; // Replace with your cloud name

  const urls = await handleImageUpload(files, uploadPreset, cloudName);
  setUploadedImages((prev) => [...prev, ...urls]);

  setUploading(false);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const bikeData = {
      title: titleRef.current.value,
      company: companyRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      location: locationRef.current.value,
      username,
      uid,
      images : uploadedImages,
      cateName,
      postedAt: serverTimestamp(),
      status : "Active"
    };
    onSubmit(bikeData);
    
    Swal.fire({
      title: "Done",
      text: "Your ad has been posted successfully.",
      icon: "success"
    });
    
navigate("/")

    priceRef.current.value =""
    locationRef.current.value =""
    descriptionRef.current.value =""
    companyRef.current.value =""
    titleRef.current.value =""

  };

  let navToMain = function (){
console.log("navigate");

  }

  return (
    <>
      <h1 className="font-bold text-[2rem] text-center">Categoty : {cateName}</h1>

      <form onSubmit={handleSubmit} className="mt-[1rem]">

        {/* files  */}

        <div className="files justify-center flex gap-4 mt-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleUpload}
                    className="hidden"
                    id="fileUpload"
                  />
                  <label
                    htmlFor="fileUpload"
                    className="cursor-pointer flex gap-x-2 justify-center w-full p-3 border border-dashed border-gray-300 rounded-md text-center"
                  >
                    <div className="w-[2rem]">
                      
                    <FaUpload className="block   text-blue-500 text-xl" />
                    </div>
                    {uploading ? "Uploading..." : "Upload Images"}
                  </label>
                </div>


        <div className="uploaded-images mt-4 grid grid-cols-3 gap-4">
          {uploadedImages.map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-32 object-cover rounded-md shadow-md"
            />
          ))}
        </div>




        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            ref={titleRef}
            placeholder="Enter ad title"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">Company</label>
          <input
            type="text"
            ref={companyRef}
            placeholder="Enter company name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">Description</label>
          <input
            type="text"
            ref={descriptionRef}
            placeholder="Enter Descripton"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            ref={locationRef}
            placeholder="Your Location"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">Price</label>
          <input
            type="text"
            ref={priceRef}
            placeholder="Enter Price"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>




        <button
        onClick={navToMain}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
        >
          Post Ad
        </button>
      </form>
    </>

  );
};

export default BikeForm;
