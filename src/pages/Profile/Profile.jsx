import "./Profile.css";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";

import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { GetProfile, UpdateProfile } from "../../services/apiCalls";

//Redux
import { profile } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Profile = () => {

    const navigate = useNavigate();
    const [write, setWrite] = useState("disabled");

    const [msg, setMsg] = useState("");
    const [loadedData, setLoadedData] = useState(false);
    const [user, setUser] = useState({
        username: "",
        name: "",
        bio: "",
        following: [],
        followedBy: [],
        email: "",
    });

    const [userError, setUserError] = useState({
        usernameError: "",
        nameError: "",
        bioError: "",
        followingError: [],
        followedByError: [],
        emailError: "",
    });

    const inputHandler = (e) => {
        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    //Instancia de Redux para escritura y lectura (see and edit profile)
    const dispatch = useDispatch();
    const rdxUser = useSelector(userData)
    useEffect(() => {
        if (!rdxUser.credentials.token) {
            navigate("/")
        }
    }, [rdxUser])
    console.log(rdxUser, "rdxUser");

    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);
    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const fetched = await GetProfile(tokenStorage);
                setUser({
                    username: fetched.data.username,
                    name: fetched.data.name,
                    bio: fetched.data.bio,
                    following: fetched.data.following,
                    followedBy: fetched.data.followedBy,
                    email: fetched.data.email,
                });

                setLoadedData(true);

            } catch (error) {
                throw new Error('Get profile failed: ' + error.message);
            }
        };

        if (!loadedData) {
            getUserProfile();
        }
    }, [tokenStorage]);

    const updateData = async () => {
        const userData = {
            username: user.username,
            name: user.name,
            bio: user.bio,
            following: user.following,
            followedBy: user.followedBy,
            email: user.email
        };

        try {
            const updatedProfile = await UpdateProfile(rdxUser.credentials.token, userData);
            setUser(updatedProfile);
            setLoadedData(false)
            setWrite("disabled");


            setMsg("Profile updated successfully, please log yourself in");
            setTimeout(() => {
                dispatch(profile({ credentials: userData }));
            }, 100);
            navigate("/login");

        } catch (error) {
            throw new Error('Updating data failed: ' + error.message);
        }
    };


    return (
        <>
            <div className="profile-design">
                {!loadedData ? (
                    <img className="loader" src="./src/img/REACT.ION.gif" alt="loader" />   //Spinner/loader?
                ) : (<>
                    <span className="greenish">⚠️</span>
                    <span className="greenish">you will need to log back in<br />after any information update</span>
                    <span className="greenish">⚠️</span>
                    <br />
                    <div>
                        <CInput
                            className={`input-design ${userError.usernameError !== "" ? "input-design-error" : ""} ${write === "" ? "border-edit" : ""}`}
                            type="text"
                            placeholder=""
                            name="username"
                            disabled={write}
                            value={user.username || ""}
                            changeEmit={(e) => inputHandler(e)}
                        />
                        <CInput
                            className={`input-design ${userError.nameError !== "" ? "input-design-error" : ""} ${write === "" ? "border-edit" : ""}`}
                            type="text"
                            placeholder="your name"
                            name="name"
                            disabled={write}
                            value={user.name || ""}
                            changeEmit={(e) => inputHandler(e)}
                        />
                        <CInput
                            className={`input-design ${userError.bioError !== "" ? "input-design-error" : ""} ${write === "" ? "border-edit" : ""}`}
                            type="text"
                            placeholder="write something about you"
                            name="bio"
                            disabled={write}
                            value={user.bio || ""}
                            changeEmit={(e) => inputHandler(e)}
                        />
                        <CInput
                            className={`input-design ${userError.emailError !== "" ? "input-design-error" : ""}`}
                            type="email"
                            placeholder=""
                            name="email"
                            disabled="disabled"
                            value={user.email || ""}
                            changeEmit={(e) => inputHandler(e)}
                        // onBlurFunction={(e) => checkError(e)}
                        />
                        <CButton
                            className={(write === "") ? "btn cButtonDesign cButtonGreen" : "btn cButtonDesign"}
                            title={write === "" ? "Confirm" : "Edit"}
                            functionEmit={write === "" ? updateData : () => setWrite("")}
                        />
                    </div>
                </>
                )}
            </div>
        </>
    );
};

