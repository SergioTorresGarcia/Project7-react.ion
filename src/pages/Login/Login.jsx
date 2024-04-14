import "./Login.css";
import { useEffect, useState } from "react";
import { CInput } from "../../common/CInput/CInput";
import { LoginUser } from "../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { validate } from "../../utils/functions";


//Redux
import { login } from "../../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";

export const Login = () => {

    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });

    const [msg, setMsg] = useState("");
    const [msgError, setMsgError] = useState("");

    //checks every change on the input
    const inputHandler = (e) => {
        //genero la función que bindea

        setCredentials((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const userData = useSelector((state) => state.user.userData);

    const [credentialsError, setCredentialsError] = useState({
        emailError: "",
        passwordError: "",
    });

    // //Instancia de Redux para escritura
    const dispatch = useDispatch();

    // main function
    const loginMe = async () => {
        try {
            for (let elemento in credentials) {
                if (credentials[elemento] === "") {
                    throw new Error("All fields are required");
                }
            }
            const fetched = await LoginUser(credentials);
            if (fetched.data) {
                const decodificado = decodeToken(fetched.data);
                const passport = {
                    token: fetched.data,
                    user: decodificado,
                };

                //saving passport in RDX
                dispatch(login({ credentials: passport }));

                setMsg(`${decodificado.username}, welcome back!`);

                setTimeout(() => {
                    navigate("/")
                }, 2000)
            }
        } catch (error) {
            setMsgError(error.message);
        }
    };

    return (

        <div className="login-design">
            {msg === "" ? (
                <div className="behind-btns smaller">
                    <div className="error">{msgError}</div>
                    <label className="white-color">Your e-mail:</label>
                    <CInput
                        className={`input-design ${credentialsError.emailError !== "" ? "input-esign-error" : ""}`}
                        type="email"
                        placeholder="example@domain.com"
                        name="email"
                        disabled={false}
                        value={credentials?.email || ""}
                        changeEmit={(e) => inputHandler(e)}
                    // onBlurFunction={(e) => checkError(e)}
                    />
                    <div className="error">{credentialsError.emailError}</div>
                    <label className="white-color">Your password:</label>
                    <CInput
                        className={`input-design ${credentialsError.passwordError !== "" ? "input-design-error" : ""
                            }`}
                        type="password"
                        placeholder="8-14 characters (incl.: small, big letters and numbers)"
                        name="password"
                        disabled={false}
                        value={credentials.password || ""}
                        changeEmit={inputHandler}
                    // onBlurFunction={(e) => checkError(e)}
                    />

                    <div className="error">{credentialsError.passwordError}</div>

                    <div className="btn">
                        <div className="btn" onClick={loginMe}>Login</div>
                    </div>
                    <br /><br />
                    <div><a className="white-color" href="./Register">Register</a>  if this is your first time here</div>
                </div>
            ) : (
                <div className="behind-btns">
                    <div>{msg}</div>
                </div>
            )}
        </div>
    )
};

