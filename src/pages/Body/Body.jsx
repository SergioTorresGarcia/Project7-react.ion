import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Profile } from "../Profile/Profile";
import { Admin } from "../Admin/Admin";
import { UserDetails } from "../UserDetails/UserDetails";
import { PostDetails } from "../PostDetails/PostDetails";


export const Body = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/"} replace />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/userDetails/:_id" element={<UserDetails />} />
            <Route path="/postDetails/:_id" element={<PostDetails />} />
        </Routes>
    );
};