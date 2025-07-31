import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/Footer";
import HomePage from "./pages/HomePage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MedicalFacility from "./pages/MedicalFacility";
import HomeSampling from "./pages/HomeSampling";
import SendSampling from "./pages/SendSampling";
import About from "./pages/AboutPage";
import GuidePage from "./pages/GuidePage";
import PricePage from "./pages/PricePage";
import SamplingInstructionsPage from "./pages/SamplingInstructionsPage";
import SampleBloodPage from "./pages/SampleBloodPage";
import SampleMucosaPage from "./pages/SampleMucosaPage";
import SampleHairPage from "./pages/SampleHairPage";
import SampleNailPage from "./pages/SampleNailPage";
import SampleNavelPage from "./pages/SampleNavelpage";
import SampleSpecialPage from "./pages/SampleSpecialPage";
import ServicesPage from "./pages/ServicesPage";
import CivilServicePage from "./pages/CivilServicePage";
import AdminstrativeServicePage from "./pages/AdminstrativeServicePage";
import HomeDNATest from './pages/HomeDNATest';
import SendDNATest from './pages/SendDNATest';
import MedicalAdmin from './pages/MedicalAdmin';
import HomeServicePage from "./pages/HomeServicePage";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
/*Phan duoi la de test page*/
import ManagerUserPage from "./pages/ManagerUserPage";
import ManagerPanel from "./pages/ManagerPanel";
//import ProtectedManagerRoute from "./component/ProtectedManagerRouter";
import ManagerPage from "./pages/manager/ManagerPage"; // page quản lý
import ManagerServicePage from "./pages/manager/ManagerServicePage"; // page quản lý dịch vụ
import ManagerStaffPage from "./pages/manager/ManagerStaffPage"; // page quản lý nhân viên
import ManagerAdminPage from "./pages/admin/ManagerAdminPage"; // page quản lý admin
import ManagerAccountPage from "./pages/admin/ManagerAccountPage"; // page quản lý tài khoản
//staff
import StaffPage from "./pages/staff/StaffPage";
import ManagerSamplePage from "./pages/staff/ManagerSamplePage";

/*end */
// import { GoogleOAuthProvider } from '@react-oauth-google';
// Không cần GoogleOAuthProvider ở đây nữa

function App() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/manager");
  const hideHeader1 = location.pathname.startsWith("/admin");
  const hideHeader2 = location.pathname.startsWith("/staff");

  return (
    <>
    {!hideHeader && !hideHeader1 && !hideHeader2 && <Header />}
      <Routes> 
        {/* Các route dành cho Customer */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/medical-facility" element={<MedicalFacility />} />
        <Route path="/home-sampling" element={<HomeSampling />} />
        <Route path="/send-sampling" element={<SendSampling />} />
        <Route path="/about" element={<About />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/price" element={<PricePage />} />
        <Route path="/mau" element={<SampleBloodPage />} />
        <Route path="/huong-dan" element={<SamplingInstructionsPage />} />
        <Route path="/niem-mac" element={<SampleMucosaPage />} />
        <Route path="/toc" element={<SampleHairPage />} />
        <Route path="/mong" element={<SampleNailPage />} />
        <Route path="/ron" element={<SampleNavelPage />} />
        <Route path="/dac-biet" element={<SampleSpecialPage />} />
        <Route path="/dich-vu" element={<ServicesPage />} />
        <Route path="/dan-su" element={<CivilServicePage />} />
        <Route path="/hanh-chinh" element={<AdminstrativeServicePage />} />
        <Route path="/nha" element={<HomeServicePage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
        <Route path="/nha" element={<HomeDNATest />} />
        <Route path="/gui-mau" element={<SendDNATest />} />
        <Route path="/medical-admin" element={<MedicalAdmin />} /> 
        {/* phan duoi la de test page */}
        <Route path="/user-management" element={<ManagerUserPage />} />
        <Route path="/manager-panel" element={<ManagerPanel />} />
        {/* Nested routing cho Manager */}
        <Route path="/manager" element={<ManagerPage />}>
            <Route path="service" element={<ManagerServicePage />} />
            <Route path="staff" element={<ManagerStaffPage />} />
        </Route>
        <Route path="/admin" element={<ManagerAdminPage />}>
            <Route path="account" element={<ManagerAccountPage />} />
            <Route path="service" element={<ManagerServicePage />} />
        </Route>
      {/* Nested routing cho Staff */}
        <Route path="/staff" element={<StaffPage />}>
            <Route path="sample" element={<ManagerSamplePage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
