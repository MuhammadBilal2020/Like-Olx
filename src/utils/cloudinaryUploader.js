import axios from "axios";

const handleImageUpload = async (files, uploadPreset, cloudName) => {
  const uploadedUrls = [];
  const formData = new FormData();

  for (const file of files) {
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset); // Cloudinary upload preset
    formData.append("cloud_name", cloudName); // Cloudinary cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url;
      uploadedUrls.push(imageUrl); // Store each uploaded URL
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  }

  return uploadedUrls; // Return all URLs after upload
};

export default handleImageUpload;
