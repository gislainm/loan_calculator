import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/error";
import Login from "./pages/LoginPage";
import Signup from "./pages/SignupPage";
import Home from "./pages/Home";
import PaymentPage from "./pages/Payment";
import ProfilePage from "./pages/Profile";
import Users from "./pages/AdminUsers";
import Sponsors from "./pages/AdminSponsors";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home/:username" element={<Home />}></Route>
        <Route path="/payment/:username" element={<PaymentPage />}></Route>
        <Route path="/profile/:username" element={<ProfilePage />}></Route>
        <Route path="/admin/users" element={<Users />}></Route>
        <Route path="/admin/sponsors" element={<Sponsors />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;