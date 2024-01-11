import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Services from './pages/Services';
import UserDashboard from './pages/user-routes/UserDashboard';
import PriavateRoute from './components/PrivateRoute';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewFeed from './components/NewFeed';
import PostPage from './pages/PostPage';
import UserProvider from "./context/UserProvider";
import Categories from "./pages/Categories";
import UpdateBlog from './pages/UpdateBlog';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import ForgotPassword from './pages/ForgotPassword';
function App() {
  return (
    <UserProvider>        
    <BrowserRouter>
      <ToastContainer position='bottom-center' />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/postpage/:postId" element={<PostPage />} />
        <Route path="/categories/:categoryId" element={<Categories />} />

        <Route path="/user" element={<PriavateRoute />} >
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="profile-info/:userId" element={<ProfileInfo />} />
          <Route path="update-blog/:blogId" element={<UpdateBlog />} />


        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>        
  );
}

export default App;




