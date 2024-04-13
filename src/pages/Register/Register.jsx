
import "./Register.css";
import { useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { RegisterUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/functions";


export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        name: "",
        bio: "",
        // following: [],
        // followedBy: [],
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        usernameError: "",
        nameError: "",
        bioError: "",
        // followingError: [],
        // followedByError: [],
        emailError: "",
        passwordError: "",
    });

    const [msg, setMsg] = useState("");
    const [msgError, setMsgError] = useState("");

    //checks every change on the input
    const inputHandler = (e) => {
        //genero la función que bindea

        setUser((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const checkError = (e) => {
        const error = validate(e.target.name, e.target.value);

        setUserError((prevState) => ({
            ...prevState,
            [e.target.name + "Error"]: error,
        }));
    };

    // main function
    const registerMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields are required");
                }
            }

            const fetched = await RegisterUser(user);
            setMsg("Register completed, please log yourself in");

            setTimeout(() => {
                navigate("/login");
            }, 3000);
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (
        <div className="register-design">
            {/* <pre>{JSON.stringify(user, null, 2)}</pre> HELP DURING DEV - preview of the body */}
            {msg === "" ? (
                <div className="behind-btns">
                    <div className="error">{msgError}</div>
                    <label className="white-color">Username:</label>
                    <CInput
                        className={`input-design ${userError.usernameError !== "" ? "input-design-error" : ""
                            }`}
                        type="text"
                        placeholder="Choose your username"
                        name="username"
                        value={user.username || ""}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="error">{userError.usernameError}</div>

                    <label className="white-color">Name:</label>
                    <CInput
                        className={`input-design ${userError.nameError !== "" ? "input-design-error" : ""
                            }`}
                        type="text"
                        placeholder="Your name"
                        name="name"
                        value={user.name || ""}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="error">{userError.nameError}</div>

                    <label className="white-color">Bio:</label>
                    <CInput
                        className={`input-design ${userError.bioError !== "" ? "input-design-error" : ""
                            }`}
                        type="text"
                        placeholder="Write about yourself"
                        name="bio"
                        value={user.bio || ""}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="error">{userError.bioError}</div>

                    <label className="white-color">E-mail:</label>
                    <CInput
                        className={`input-design ${userError.emailError !== "" ? "input-design-error" : ""
                            }`}
                        type="email"
                        placeholder="example@domain.com"
                        name="email"
                        value={user.email || ""}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="error">{userError.emailError}</div>

                    <label className="white-color">Password:</label>
                    <CInput
                        className={`input-design ${userError.passwordError !== "" ? "input-design-error" : ""
                            }`}
                        type="password"
                        placeholder="8-14 characters (incl.: small, big letters and numbers)"
                        name="password"
                        value={user.password || ""}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="error">{userError.passwordError}</div>


                    <div className="btn">
                        <div className="btn" onClick={registerMe}>Register</div>
                    </div>

                    <br /><br />
                    <div><a className="white-color" href="./Login">Login</a>  if you have an account already</div>

                </div>

            ) : (
                <div className="behind-btns">
                    <div>{msg}</div>
                </div>
            )}
        </div>
    )
};