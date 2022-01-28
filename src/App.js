import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import BlogDetail from "./Components/Blogs/BlogDetail";
import Footer from "./Components/Footer/Footer";
import Navigationbar from "./Components/Navigation/Navigationbar";
import Signup from "./Components/Signup/Signup";
import SignIn from "./Components/SignIn/SignIn";
import Home from "./Pages/Home";
import MyAccount from "./Components/MyAccount/MyAccount";
import AuthProvider from "./Context/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import AddBlog from './Components/AddBlog/AddBlog'
import AdminRoute from "./PrivateRoute/AdminRoute";
import ManageBlogs from "./Components/ManageBlogs/ManageBlogs";
import MakeAdmin from "./Components/MakeAdmin/MakeAdmin";
function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navigationbar />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/blog/:_id" element={<PrivateRoute><BlogDetail /></PrivateRoute>}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/addblog" element={<PrivateRoute><AddBlog /></PrivateRoute>}></Route>
            <Route path="/myaccount" element={<PrivateRoute><MyAccount /></PrivateRoute>} />
            <Route path="/manageblogs" element={<AdminRoute><ManageBlogs /></AdminRoute>} />
            <Route path="/makeadmin" element={<AdminRoute><MakeAdmin /></AdminRoute>} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
