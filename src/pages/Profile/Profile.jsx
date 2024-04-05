import "./Profile.css";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";

export const Profile = () => {

    const navigate = useNavigate();

    //Conectamos con Redux en modo lectura

    const rdxUser = useSelector(userData)

    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])

    return (
        <div className="profile-design">
            soy el perfil
        </div>
    )
}