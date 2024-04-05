
import "./Register.css";
import { useEffect, useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { RegisterUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { validate } from "../../utils/functions";


//Redux
import { login } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        // first_name: "",
        // last_name: "",
        username: "",
        // birth_date: "",
        email: "",
        password: "",
    });

    const [userError, setUserError] = useState({
        usernameError: "",
        // dateError: "",
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

    // const userData = useSelector((state) => state.user.userData);

    // main function
    const registerMe = async () => {
        try {
            for (let elemento in user) {
                if (user[elemento] === "") {
                    throw new Error("All fields are requiredFRONT");
                }
            }

            const fetched = await RegisterUser(user);

            console.log(fetched);
            setMsg("Register completed, please log yourself in");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
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
                        placeholder="Choose an username"
                        name="username"
                        value={user.username || ""}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="error">{userError.first_nameError}</div>

                    <label className="white-color">E-mail:</label>
                    <CInput
                        className={`input-design ${userError.emailError !== "" ? "input-design-error" : ""
                            }`}
                        type="email"
                        placeholder="Write your email"
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
                        placeholder="Password must have between 8 and 14 characters, and contain small/big letters and numbers"
                        name="password"
                        value={user.password || ""}
                        changeEmit={(e) => inputHandler(e)}
                    />
                    <div className="error">{userError.passwordError}</div>


                    <div className="btn">
                        <div className="btn" onClick={registerMe}>Register</div>
                    </div>

                </div>
            ) : (
                <div>{msg}</div>
            )}
        </div>
    )
};

// /////////


// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// import "./Register.css";
// import { validate } from "../../utils/functions";

// import { CInput } from "../../common/CInput/CInput";
// import { CButton } from "../../common/CButton/CButton";

// import { RegisterUser } from "../../services/apiCalls";
// import { Header } from "../../common/Header/Header";

// export const Register = () => {
//     const navigate = useNavigate();

//     const [user, setUser] = useState({
//         first_name: "",
//         last_name: "",
//         birth_date: "",
//         email: "",
//         password: "",
//     });

//     const [userError, setUserError] = useState({
//         nameError: "",
//         dateError: "",
//         emailError: "",
//         passwordError: "",
//     });

//     const [msgError, setMsgError] = useState("");

//     const inputHandler = (e) => {
//         // binding
//         setUser((prevState) => ({
//             ...prevState,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const checkError = (e) => {
//         const error = validate(e.target.name, e.target.value);

//         setUserError((prevState) => ({
//             ...prevState,
//             [e.target.name + "Error"]: error,
//         }));
//     };

//     const registerMe = async () => {
//         try {
//             for (let elemento in user) {
//                 if (user[elemento] === "") {
//                     throw new Error("All fields are required");
//                 }
//             }

//             const fetched = await RegisterUser(user);

//             console.log(fetched);
//             setMsgError(fetched.message);

//             setTimeout(() => {
//                 navigate("/login");
//             }, 1200);
//         } catch (error) {
//             setMsgError(error.message);
//         }
//     };

//     return (
//         <>
//             <Header />
//             <div className="registerDesign">
//                 {/* <pre>{JSON.stringify(user, null, 2)}</pre> HELP DURING DEV - preview of the body */}
//                 <label className="tealColor">First name:</label>
//                 <CInput
//                     className={`inputDesign ${userError.first_nameError !== "" ? "inputDesignError" : ""
//                         }`}
//                     type={"text"}
//                     placeholder={""}
//                     name={"first_name"}
//                     value={user.first_name || ""}
//                     onChangeFunction={(e) => inputHandler(e)}
//                     onBlurFunction={(e) => checkError(e)}
//                 />
//                 <div className="error">{userError.first_nameError}</div>

//                 <label className="tealColor">Last name:</label>
//                 <CInput
//                     className={`inputDesign ${userError.last_nameError !== "" ? "inputDesignError" : ""
//                         }`}
//                     type={"text"}
//                     placeholder={""}
//                     name={"last_name"}
//                     value={user.last_name || ""}
//                     onChangeFunction={(e) => inputHandler(e)}
//                     onBlurFunction={(e) => checkError(e)}
//                 />
//                 <div className="error">{userError.last_nameError}</div>


//                 <label className="tealColor">Date of birth:</label>
//                 <CInput
//                     className={`inputDesign ${userError.birth_dateError !== "" ? "inputDesignError" : ""
//                         }`}
//                     type={"text"}
//                     placeholder={"YYYY-MM-DD"}
//                     name={"birth_date"}
//                     value={user.birth_date || ""}
//                     onChangeFunction={(e) => inputHandler(e)}
//                     onBlurFunction={(e) => checkError(e)}
//                 />
//                 <div className="error">{userError.birth_dateError}</div>

//                 <label className="tealColor">E-mail address:</label>
//                 <CInput
//                     className={`inputDesign ${userError.emailError !== "" ? "inputDesignError" : ""
//                         }`}
//                     type={"email"}
//                     placeholder={"example@domain.com"}
//                     name={"email"}
//                     value={user.email || ""}
//                     onChangeFunction={(e) => inputHandler(e)}
//                     onBlurFunction={(e) => checkError(e)}
//                 />
//                 <div className="error">{userError.emailError}</div>
//                 <label className="tealColor">Password:</label>
//                 <CInput
//                     className={`inputDesign ${userError.passwordError !== "" ? "inputDesignError" : ""
//                         }`}
//                     type={"password"}
//                     placeholder={"8-14 characters (incl.: small, big letters and numbers)"}
//                     name={"password"}
//                     value={user.password || ""}
//                     onChangeFunction={(e) => inputHandler(e)}
//                     onBlurFunction={(e) => checkError(e)}
//                 />
//                 <div className="error">{userError.passwordError}</div>
//                 <CButton
//                     className={"cButtonDesign"}
//                     title={"Register"}
//                     functionEmit={registerMe}
//                 />
//                 <div className="error">{msgError}</div>
//             </div>
//         </>
//     );
// };