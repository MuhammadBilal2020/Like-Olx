// const [uploadedImages, setUploadedImages] = useState([]);
//   const [uploading, setUploading] = useState(false);

// const handleImageUpload = async (e) => {
//     const files = e.target.files;
//     if (!files.length) return;

//     setUploading(true);
//     const formData = new FormData();
    

//     // Loop through files and upload each
//     for (const file of files) {
//       formData.append("file", file);
//       formData.append("upload_preset", "olx_uploads"); // Replace with your Cloudinary upload preset
//       formData.append("cloud_name", "dpdxrs2pg"); // Replace with your Cloudinary cloud name

//       try {
//         const response = await axios.post(
//           `https://api.cloudinary.com/v1_1/dpdxrs2pg/image/upload`,
//           formData
//         );

//         const imageUrl = response.data.secure_url;
//         setUploadedImages((prev) => [...prev, imageUrl]);
//       } catch (error) {
//         console.error("Error uploading image: ", error);
//       }
//     }

//     setUploading(false);
//   };











<div className="h-40 overflow-hidden">
<img
  src={
    Array.isArray(item.images) && item.images.length > 0
      ? item.images[0]
      : 'https://via.placeholder.com/150'
  }
  alt={item.title || 'Product Image'}
  className="h-full w-full object-cover"
/>
</div>