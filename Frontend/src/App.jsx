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
