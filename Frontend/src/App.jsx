import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css"
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/Login/LoginScreen';
import SignUp from './Screens/Signup/SignUp';
import Dashboard from './Screens/Dashboard/Dashboard';
import DonationScreen from './Screens/Donation/Donation';
import DonationsList from './Screens/DonationList/DonationList';
import YouTubeVideos from './Components/YoutubeVideos';
import BlogHome from "./Screens/Blogs/BlogHome";
import BlogList from "./Screens/Blogs/BlogList";
import Blog from "./Screens/Blogs/Blog";
import BlogPost from "./Screens/Blogs/BlogPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  }
  ,
  {
    path: "/signup",
    element: <SignUp />,
  }
  ,
  {
    path: "/dashboard",
    element: <Dashboard />,
    children:[
      {
        path : 'profile',
      },
      {
        path : 'donation',
        element : <DonationScreen />
      },
      {
        path : 'donationlist',
        element : <DonationsList />
      },
      {
        path : 'Edu',
        element : <YouTubeVideos />
      },
      {
        path : 'blog',
        element : <BlogHome />
      },
      {
        path : 'blogPost',
        element : <BlogPost />
      },
      {
        path : 'blogList',
        element : <BlogList />
      },
      {
        path : 'blogs/:id',
        element : <Blog />
      },
      {
        path : 'settings',
      },
    ]
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

