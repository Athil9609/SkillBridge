import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import './bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Landing from './Pages/Landing';
import Auth from './Pages/Auth';
import ManageUsers from './Components/Admin/ManageUsers';
import ManageSkillCategories from './Components/Admin/SkillCategroy/ManageSkillCategories';
import RatingAndFeedback from './Components/Admin/RatingAndFeedback';
import ViewTransactions from './Components/Admin/ViewTransactions';
import ViewComplaints from './Components/Admin/ViewComplaints';
import SkillListings from './Components/Admin/SkillListing/SkillListing';
import SkillCategory from './Components/User/Skills/SkillCategory';
import ViewSkills from './Components/User/Skills/ViewSkills/';
import SkillDetails from './Components/User/Skills/SkillDetails';
import UserDetails from './Components/User/Skills/UserDetails';
import UserHome from './Components/User/UserHome';
import UserDashboard from './Components/User/Dashboard/UserDashboard';
import AdminHome from './Components/Admin/AdminHome';

// Import the new Navbars
import AdminNavbar from './Components/Header/AdminNavbar';
import UserNavbar from './Components/Header/UserNavbar';
import AdminDashboard from './Components/Admin/Dashboard/AdminDashboard';
import UserDocuments from './Components/Admin/UserDocuments';
import Bookings from './Components/User/Bookings/Bookings';
import Payment from './Components/User/Bookings/Payment';
import Contact from './Components/User/Contact';
import TimePurchase from './Components/User/Bookings/TimePurcahse';
function App() {
  const location = useLocation();

  // Check if current route is an Admin route
  const isAdminRoute = location.pathname.startsWith('/manage') || 
                       location.pathname.startsWith('/view') ||
                       location.pathname.includes('Admn')||
                       location.pathname.startsWith('/certifications')

  // Check if current route is a User route
  const isUserRoute = 
                      location.pathname.startsWith('/user') ||
                      location.pathname.includes('Usr')||
                      location.pathname.includes('chat')

                      

  return (
    <>
      {/* Conditionally render the Navbar */}
      {isAdminRoute && <AdminNavbar />}
      {isUserRoute && <UserNavbar />}

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/userhome' element={<UserHome />} />
        <Route path='/auth' element={<Auth />} />

        {/* Admin Routes */}

        <Route path='/AdmnHome' element={<AdminHome />} />
        <Route path='/AdmnDashboard' element={<AdminDashboard />} />
        <Route path='/manageUser' element={<ManageUsers />} />
        <Route path='/manageSkillCategory' element={<ManageSkillCategories />} />
        <Route path='/viewTransactions' element={<ViewTransactions />} />
        <Route path='/viewRatingAdmn' element={<RatingAndFeedback />} />
        <Route path='/viewComplaintsAdmn' element={<ViewComplaints />} />
        <Route path='/skillListingAdmn' element={<SkillListings />} />
        <Route path='/certifications' element={<UserDocuments />} />


        {/* User Routes */}
        <Route path='/SkillCategoryUsr' element={<SkillCategory />} />
        <Route path='/SkillsUsr/:id' element={<ViewSkills />} />
        <Route path='/SkillsDetailsUsr/:skillname' element={<SkillDetails />} />
        <Route path='/userdetails/:userId' element={<UserDetails />} />
        <Route path='user/dash' element={<UserDashboard />} />
        <Route path='userdetails/user/mybookings' element={<Bookings />} />
        <Route path='/user/contact' element={<Contact />} />
        <Route path='user/payment/:id' element={<Payment />} />
        <Route path='user/purchase-time' element={<TimePurchase />} />


      </Routes>
      <ToastContainer/>

    </>
  );
}

export default App;
