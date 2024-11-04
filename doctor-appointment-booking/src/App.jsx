import React from "react";
import {Routes,Route} from 'react-router-dom';
import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {

  return (
    <div className="mx-4 sm:mx-[10%]">
     <Navbar/> 
     <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/doctors" element={<Doctors />}/>
      <Route path="/doctors/:specialty" element={<Doctors />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/about" element={<About />}/>
      <Route path="/contact" element={<Contact />}/>
      <Route path="/appointment/:docId" element={<Appointment />}/>
      <Route path="/myProfile" element={<MyProfile />}/>
      <Route path="/myAppointments" element={<MyAppointments />}/>
     </Routes>
     <Footer />
    </div>
  );
};

export default App;
