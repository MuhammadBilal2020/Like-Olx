// import React, { useState, useEffect } from 'react';
// import { auth, db } from '../../config/firebaseconfig.js'; // Import Firebase config
// import { collection, query, where, onSnapshot, orderBy } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js';
// import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'; // Import Firebase Authentication
// import Navbar from '../../components/Navbar';

// const Chat = () => {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [selectedChat, setSelectedChat] = useState(null); // Track selected chat for specific user
//   const [uid, setUid] = useState(null); // State to store the logged-in user's UID

//   // Fetch messages for all chats
//   const fetchMessages = (userUid) => {
//     try {
//       console.log("Fetching chats for UID:", userUid); // Log the UID being used
//       const chatRef = collection(db, "chats");
  
//       // Query for chats where the user is user1 or user2
//       const q1 = query(
//         chatRef,
//         where("user1_uid", "==", userUid),  // If user is user1
//         orderBy("timestamp")
//       );
//       const q2 = query(
//         chatRef,
//         where("user2_uid", "==", userUid),  // If user is user2
//         orderBy("timestamp")
//       );
  
//       // Fetch both queries
//       const unsubscribe1 = onSnapshot(q1, (snapshot) => {
//         console.log("Fetched chats (user1_uid):", snapshot.docs); // Log the snapshot for user1
//         const allChats = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages((prevMessages) => [...prevMessages, ...allChats]);
//       });
  
//       const unsubscribe2 = onSnapshot(q2, (snapshot) => {
//         console.log("Fetched chats (user2_uid):", snapshot.docs); // Log the snapshot for user2
//         const allChats = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages((prevMessages) => [...prevMessages, ...allChats]);
//       });
  
//       return () => {
//         unsubscribe1();
//         unsubscribe2();
//       };
//     } catch (error) {
//       console.error("Error fetching chats:", error);
//     }
//   };
  
  
  
  

//   // Initialize auth state and fetch chats once the user is authenticated
//   useEffect(() => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         setUid(user.uid); // Store the authenticated user's UID
//         console.log(user.uid);
        
//       } else {
//         console.log("No user logged in");
//       }
//     });
//   }, []);

//   // Fetch messages once UID is available
//   useEffect(() => {
//     if (uid) {
//       const unsubscribe = fetchMessages(uid);
//       return unsubscribe; // Cleanup when the component unmounts or the UID changes
//     }
//   }, [uid]);

//   // Handle sending a message
//   const handleSendMessage = async () => {
//     if (!newMessage.trim() || !selectedChat) return; // Don't send empty messages or messages without a selected chat

//     try {
//       const chatRef = collection(db, "chats", selectedChat, "messages");
//       await addDoc(chatRef, {
//         message: newMessage,
//         senderId: uid,
//         timestamp: new Date(),
//       });
//       setNewMessage(""); // Clear the input after sending
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <>
//       <Navbar />
//       <div className="chat-container w-[800px] mx-auto p-4 bg-[#f9f9f9] rounded-md shadow-md">
//         <div className="chat-list">
//           {/* List of chats with users */}
//           {messages.map((chat, index) => (
//             <div
//               key={index}
//               onClick={() => setSelectedChat(chat.id)} // Set the selected chat by ID
//               className="chat-preview p-2 cursor-pointer bg-white mb-2 rounded"
//             >
//               <p>Chat with {chat.participants.filter(p => p !== uid)[0]}</p> {/* Display chat with the other participant */}
//             </div>
//           ))}
//         </div>

//         {selectedChat && (
//           <>
//             <div className="messages h-[400px] overflow-y-auto mb-[10px]">
//               {/* Fetch and display messages for the selected chat */}
//               {messages
//                 .filter(msg => msg.id === selectedChat) // Filter messages for the selected chat
//                 .map((msg, index) => (
//                   <div
//                     key={index}
//                     className={`message bg-[#fff] p-3 rounded mx-[5px] ${msg.senderId === uid ? 'sent' : 'received'}`}
//                   >
//                     <p>{msg.message}</p>
//                     <span>{new Date(msg.timestamp.seconds * 1000).toLocaleTimeString()}</span>
//                   </div>
//                 ))}
//             </div>

//             <div className="message-input flex justify-between">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type a message..."
//               />
//               <button onClick={handleSendMessage}>Send</button>
//             </div>
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default Chat;
