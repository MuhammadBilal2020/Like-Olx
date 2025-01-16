// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"; // Use your correct Firebase version import
// import { db } from "../../config/firebaseconfig";
// import Navbar from "../../components/Navbar";

// const SingleUserChat = () => {
//   const { uid } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     if (!uid) return;

//     // Reference to the collection for messages between the current user and the selected user
//     const messagesRef = collection(db, "chats", uid, "messages");
//     const q = query(messagesRef, orderBy("timestamp", "asc"));

//     // Real-time listener for messages
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setMessages(msgs);
//     });

//     return () => unsubscribe(); // Cleanup listener on unmount
//   }, [uid]);

//   const sendMessage = async () => {
//     if (!newMessage.trim()) return; // Prevent sending empty messages

//     // Reference to the collection for messages
//     const messagesRef = collection(db, "chats", uid, "messages");

//     // Add new message
//     await addDoc(messagesRef, {
//       content: newMessage,
//       sender: "currentUser", // Replace with actual current user ID or name
//       timestamp: new Date(),
//     });

//     setNewMessage(""); // Clear the input after sending
//   };

//   return (
//     <div className="h-screen flex flex-col bg-gray-100 p-4">
//       <Navbar />
//       {/* Chat Header */}
//       <div className="flex items-center space-x-4 p-4 bg-white border-b">
//         <img
//           src="placeholder.jpg" // Replace with dynamic user image if available
//           alt="User"
//           className="w-12 h-12 rounded-full"
//         />
//         <div>
//           <h2 className="text-xl font-semibold">User {uid}</h2> {/* Replace with dynamic username if available */}
//           <p className="text-sm text-gray-500">Online</p>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-auto p-4 space-y-4 bg-white rounded-lg shadow-md mt-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`flex ${msg.sender === "currentUser" ? "justify-end" : "justify-start"}`}
//           >
//             <div
//               className={`max-w-xs p-2 rounded-lg ${
//                 msg.sender === "currentUser"
//                   ? "bg-blue-500 text-white"
//                   : "bg-gray-200 text-gray-800"
//               }`}
//             >
//               <p>{msg.content}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Message Input */}
//       <div className="flex items-center space-x-4 p-4 bg-white border-t">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type a message..."
//           className="flex-1 p-2 border rounded-md"
//         />
//         <button
//           onClick={sendMessage}
//           className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SingleUserChat;
