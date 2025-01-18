import React, { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

import handleImageUpload from "../../../utils/cloudinaryUploader.js";
import { useNavigate } from "react-router-dom";

const CarForm = ({ onSubmit, cateName, username, uid }) => {
  const titleRef = useRef("");
  const companyRef = useRef("");
  const descriptionRef = useRef("");
  const priceRef = useRef("");
  const locationRef = useRef("");

  // for images 
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  let navigate = useNavigate()

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
 
    const carData = {
      title: titleRef.current.value,
      company: companyRef.current.value,
      description: descriptionRef.current.value,
      price: priceRef.current.value,
      location: locationRef.current.value,
      username,
      uid,
      cateName,
      postedAt: serverTimestamp(),
      images: uploadedImages, // Include uploaded image URLs
      status : "Active"
    };

    onSubmit(carData);

    priceRef.current.value =""
    locationRef.current.value =""
    descriptionRef.current.value =""
    companyRef.current.value =""
    titleRef.current.value =""

    navigate("/")
  };

  

  return (
    <>
      <h1 className="font-bold text-[2rem] text-center">
        Category : {cateName}
      </h1>

      <form onSubmit={handleSubmit} className="mt-[1rem]">
        {/* Image Upload Section */}
        <label className="block text-gray-700 font-medium mb-2">
          Upload Images
        </label>
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


        {/* Display Uploaded Images */}
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

        {/* Other Input Fields */}
        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            ref={titleRef}
            required
            placeholder="Enter ad title"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">Company</label>
          <input
            type="text"
            required
            ref={companyRef}
            placeholder="Enter company name"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            type="text"
            required
            ref={descriptionRef}
            placeholder="Enter Description"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            required
            ref={locationRef}
            placeholder="Your Location"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mt-[.8rem]">
          <label className="block text-gray-700 font-medium mb-2">price</label>
          <input
            type="text"
            required
            ref={priceRef}
            placeholder="Your Location"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        {/* Submit Button */}
        <button
        // onClick={navToMain}
          type="submit"
          className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        >
          Post Ad
        </button>
      </form>
    </>
  );
};

export default CarForm;
