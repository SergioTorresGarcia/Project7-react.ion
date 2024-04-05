import "./Home.css";

import { useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect } from "react";
export const Home = () => {
    //Instancia de Redux en modo lectura para home

    const searchRdx = useSelector(searchData);

    useEffect(() => {
        console.log(searchRdx);
    }, [searchRdx]);

    return <div className="home-design">soy home</div>;
};