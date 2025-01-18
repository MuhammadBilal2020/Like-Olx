import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


import Register from './screens/register/register.jsx';
import Login from './screens/login/login.jsx';

// Post routes
import PostAd from './screens/postad/postad.jsx';
import PostForm from './screens/postAdForm/PostForm.jsx';

// Profile routes
import Myads from './screens/profile routes/myAds.jsx';
import Profile from './screens/profile routes/Profile.jsx';
import MyFav from './screens/profile routes/myFav.jsx';
import Setting from './screens/profile routes/setting.jsx';
import ProductDetail from './screens/product/productDetail.jsx';
import PostProfile from './screens/profile routes/postProfile.jsx';
import ProtectedRoute from '../protectedRoutes.jsx';
import { AuthProvider } from '../authProvider.jsx';
// import Chat from './screens/chats/Chat.jsx';
// import SingleUserChat from './screens/chats/SingleUserChat.jsx';

const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
  },
  {
    path: '/productDetail/:id',
    element: <ProductDetail />,
  },
  {
    path: '/postprofile/:postUid',
    element: <PostProfile />,
  },
  {
    path: 'register',
    element: <Register />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  // Post routes
  {
    path: '/postad',
    element: (
      <ProtectedRoute>
        <PostAd />
      </ProtectedRoute>
    ),
  },
  {
    path: '/postAdForm/:cateName',
    element: (
      <ProtectedRoute>
        <PostForm />
      </ProtectedRoute>
    ),
  },
  // Profile routes
  {
    path: '/myads',
    element: (
      <ProtectedRoute>
        <Myads />
      </ProtectedRoute>
    ),
  },
  {
    path: '/myfav',
    element: (
      <ProtectedRoute>
        <MyFav />
      </ProtectedRoute>
    ),
  },
  {
    path: '/setting',
    element: (
      <ProtectedRoute>
        <Setting />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  // Uncomment and protect Chat routes if needed
  // {
  //   path: '/chats',
  //   element: (
  //     <ProtectedRoute>
  //       <Chat />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: '/chat/:uid',
  //   element: (
  //     <ProtectedRoute>
  //       <SingleUserChat />
  //     </ProtectedRoute>
  //   ),
  // },
]);

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </AuthProvider>
);
