import { CInput } from "../CInput/CInput"
import { CLink } from "../CLink/CLink"
import "./Header.css"

//RDX
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logout, userData } from "../../app/slices/userSlice";
import { updateCriteria } from "../../app/slices/searchSlice";
import { useNavigate } from "react-router-dom";


export const Header = (() => {
    const navigate = useNavigate()
    //Instanciating reading mode
    const rdxUser = useSelector(userData);

    //Instanciating writing mode
    const dispatch = useDispatch();

    useEffect(() => {
        console.log((rdxUser, " credentials passport "));
    }, [rdxUser]);

    const [criteria, setCriteria] = useState("");

    const searchHandler = (e) => {
        setCriteria(e.target.value)
    }

    useEffect(() => {
        if (criteria !== "") {
            //saving in redux
            dispatch(updateCriteria(criteria))
        }
    }, [criteria])

    return (<>
        <div className="header-design">
            {/* LOGO */}
            <div className="logo">
                <img className="logo" src="./src/img/logo_dark.png" alt="logo_dark" onClick={() => navigate("/")} />
            </div>


            {/* TEXT ON THE RIGHT */}
            <div className="on-the-right">



                {rdxUser?.credentials?.token ? (
                    <>
                        {/* SEARCH-BAR */}
                        < CInput

                            type="text"
                            name="criteria"
                            value={criteria || ""}
                            changeEmit={searchHandler}
                        />
                        {/* PROFILE & LOGOUT */}
                        <div className="navigator-design">
                            <CLink path="/profile" title={rdxUser?.credentials?.user?.username} />
                            <div className="out-design"
                                onClick={() => dispatch(logout({ credentials: "" }))}
                            >
                                <span>log out</span>
                            </div>
                        </div>
                    </>
                ) : (
                    // LOGIN & REGISTER
                    <div className="navigator-design">
                        <CLink path="/login" title="Login" />
                        <CLink path="/register" title="Register" />
                    </div>
                )}
            </div>
        </div>
    </>)
})