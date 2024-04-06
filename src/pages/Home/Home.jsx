import "./Home.css";

import { useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect } from "react";
export const Home = () => {
    //Instancia de Redux en modo lectura para hom
    const searchRdx = useSelector(searchData);

    useEffect(() => {
        console.log(searchRdx);
    }, [searchRdx]);

    return (

        <div className="home-design">
            {/* temporary untill i resolve the ternaria below */}
            <img className="gif" src="src/img/REACT.ION.gif" alt="gif logo" />



            {/* <div className="group">
            {rdxUser?.credentials?.token
                ? (
                    // TIMELINE....
                    <div>
                        <span>
                            <input
                                placeholder="service name"
                                className="btn1"
                                type="text"
                                name="serviceName"
                                value={newService.serviceName}
                                onChange={(e) => setNewService({ ...newService, serviceName: e.target.value })}
                            />
                        </span>
                        <span>
                            <input
                                placeholder="description"
                                className="btn2"
                                type="text"
                                name="description"
                                value={newService.description}
                                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                            />
                        </span>
                        <span>
                            <button className="newServiceBtn" onClick={() => { createService(tokenStorage, newService) }}>
                                CREATE NEW SERVICE
                            </button>
                        </span>
                    </div>
                ) : (
                    // LOADING....
                    <div>
                        <img className="gif" src="src/img/REACT.ION.gif" alt="gif logo" />
                    </div>
                )
            }


            <div className="cardGroup">
                {data.map((item) => (
                    <CCard
                        id={item.id}
                        key={item.id}
                        title={item.serviceName}
                        description={item.description}
                        onClick={() => seeDetails(item.id)}
                        // there are only 4 pics that repeat periodically
                        imageUrl={`../img/s${item.id <= 4 ? item.id : item.id % 4}.png`}
                    />
                ))}
            </div>
            </div> */}
        </div>
    )
};