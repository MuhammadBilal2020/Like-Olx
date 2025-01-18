
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Register from './screens/register/register.jsx'
import Login from './screens/login/login.jsx'

// post routes 
import PostAd from './screens/postad/postad.jsx'
import PostForm from './screens/postAdForm/PostForm.jsx'

// profile pic routes 
import Myads from './screens/profile routes/myAds.jsx'
import Profile from './screens/profile routes/Profile.jsx'
import MyFav from './screens/profile routes/myFav.jsx'
import Setting from './screens/profile routes/setting.jsx'
import ProductDetail from './screens/product/productDetail.jsx'
import PostProfile from './screens/profile routes/postProfile.jsx'
// import Chat from './screens/chats/Chat.jsx'
// import SingleUserChat from './screens/chats/SingleUserChat.jsx'

const router = createBrowserRouter([

    // route related products 
    {
        path: '',
        element: <App />
    },
    {
        path : "/productDetail/:id",
        element : <ProductDetail/>
        
    },
    {
        path : "/postprofile/:postUid",
        element : <PostProfile/>
        
    },


    {
        path: 'register',
        element: <Register />
    },

    {
        path: 'login',
        element: <Login />
    },

    //routes related post 
    {
        path: '/postad',
        element: <PostAd />,

    },
    {
      path : "/postAdForm/:cateName",
      element : <PostForm/>
    },

    // routes related profile 
   
    {
        path: '/myads',
        element: <Myads/>,
    },
    {
        path: '/myfav',
        element: <MyFav/>,
    },
    {
        path: '/setting',
        element: <Setting/>,
    },
    {
        path: '/profile',
        element: <Profile />,

    },
    // {
    //     path: '/chats',
    //     element: <Chat />,

    // },
    // {
    //     path: '/chat/:uid',
    //     element: <SingleUserChat />,

    // },



])



createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>

        <App />

    </RouterProvider>



)
