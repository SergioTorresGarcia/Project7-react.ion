
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { UpdateUser } from "../../services/apiCalls";
import { userData } from "../../app/slices/userSlice";
import "./UserDetails.css"

export const UserDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rdxUser = useSelector(userData);
    const { _id } = useParams();

    const [user, setUser] = useState({
        username: "",
        profile: {
            name: "",
            bio: "",
        },
        email: "",
    });

    const [userError, setUserError] = useState({
        usernameError: "",
        profile: {
            nameError: "",
            bioError: ""
        },
        emailError: "",
    });

    const [loadedData, setLoadedData] = useState(false);

    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);

    useEffect(() => {
        const getUserDetailsFromAPI = async (_id) => {
            try {
                const fetchedUser = await UpdateUser(tokenStorage, _id, {});

                setUser(fetchedUser.data);
                setLoadedData(false);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        getUserDetailsFromAPI(_id);
    }, [_id, tokenStorage]);

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const updateUser = async () => {
        try {
            await UpdateUser(tokenStorage, _id, user);
            navigate(`/admin`);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="user-detail-design">
            <h2 className="white-color behind">Edit User</h2>
            <label className="white-color">User Id</label>
            <CInput
                className="input-design"
                type="text"
                placeholder="userId"
                name="_id"
                value={user._id}
                disabled="disabled"
                changeEmit={(e) => inputHandler(e)}
            />
            <label className="white-color">Username</label>
            <CInput
                className="input-design border-edit"
                type="text"
                placeholder="username"
                name="username"
                value={user.username}
                changeEmit={(e) => inputHandler(e)}
            />
            <label className="white-color">Name</label>
            <CInput
                className="input-design border-edit"
                type="text"
                placeholder="your name"
                name="name"
                value={user.profile.name}
                changeEmit={(e) => inputHandler(e)}
            />
            <label className="white-color">Bio</label>
            <CInput
                className="input-design border-edit"
                type="text"
                placeholder="write something about you"
                name="bio"
                value={user.profile.bio}
                changeEmit={(e) => inputHandler(e)}
            />
            <label className="white-color">Email</label>
            <CInput
                className="input-design"
                type="email"
                placeholder=""
                name="email"
                disabled="disabled"
                value={user.email}
                changeEmit={(e) => inputHandler(e)}
            />

            <CButton
                className="btn cButtonDesign behind"
                title="Save changes"
                functionEmit={updateUser}
            />
        </div>
    );
};

