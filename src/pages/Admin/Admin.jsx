import "./Admin.css";
import { searchData } from "../../app/slices/searchSlice";
import { userData } from "../../app/slices/userSlice";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers, DeleteUser } from "../../services/apiCalls"; //, GetServices, DeleteService, GetAllAppointments, DeleteAppointment
import dayjs from "dayjs";
import { Pagination } from "../../common/Pagination/Pagination";

//Redux
import { useDispatch, useSelector } from "react-redux";

const numUserDisplay = 5;
// const numServiceDisplay = 2;
// const numAppointmentDisplay = 15;

export const Admin = () => {

    ///
    //Instancia de Redux en modo lectura para home
    const searchRdx = useSelector(searchData);

    useEffect(() => {
        console.log(searchRdx);
    }, [searchRdx]);
    ///

    //Instancia de Redux para escritura y lectura (see and edit profile)
    const dispatch = useDispatch();
    const rdxUser = useSelector(userData);

    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])
    console.log(rdxUser, "rdxUser");

    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);

    const [users, setUsers] = useState([]);
    // const [services, setServices] = useState([]);
    // const [appointments, setAppointments] = useState([]);

    const [rowNumbers1, setRowNumbers1] = useState([]);
    // const [rowNumbers2, setRowNumbers2] = useState([]);
    // const [rowNumbers3, setRowNumbers3] = useState([]);

    const [roleStorage, setRoleStorage] = useState(rdxUser?.credentials.user.roleName);

    const [currentPageU, setCurrentPageU] = useState(1);
    // const [currentPageS, setCurrentPageS] = useState(1);
    // const [currentPageA, setCurrentPageA] = useState(1);

    const [usersPerPage] = useState(numUserDisplay); // Number of users per page
    // const [servicesPerPage] = useState(numServiceDisplay); // Number of services per page
    // const [appointmentsPerPage] = useState(numAppointmentDisplay); // Number of appointments per page

    // control admin access only
    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin")
        }
    }, [])

    // fetching info
    useEffect(() => {
        fetchUsers();
        // fetchServices();
        // fetchAppointments();
    }, []);

    // geting users
    const fetchUsers = async () => {
        try {
            if (!tokenStorage) {
                throw new Error("Token is not available");
            }
            const usersData = await GetUsers(tokenStorage);
            setLoadedData(true)
            setUsers(usersData.data)

        } catch (error) {
            throw new Error('Get users failed: ' + error.message);
        }
    };


    // // geting services
    // const fetchServices = async () => {
    //     try {
    //         const responseServices = await GetServices(); //fetching function in apiCalls.js
    //         setServices(responseServices.data); //we update data with the fetched response

    //     } catch (error) {
    //         throw new Error('Cannot fetch services:' + error.message);
    //     }
    // };

    // // geting appointments
    // const fetchAppointments = async () => {
    //     try {
    //         if (!tokenStorage) {
    //             throw new Error("Token is not available");
    //         }
    //         const appointmentData = await GetAllAppointments(tokenStorage);
    //         setLoadedData(true)
    //         setAppointments(appointmentData)

    //     } catch (error) {
    //         throw new Error('Get appointments failed: ' + error.message);
    //     }
    // };

    // Users indexes ordered (as ids might be not continuous when some are deleted
    useEffect(() => {
        const numbers1 = users.map((_, index) => index + 1);
        setRowNumbers1(numbers1);
    }, [users]);

    // // Services indexes ordered (as ids might be not continuous when some are deleted
    // useEffect(() => {
    //     const numbers2 = services.map((_, index) => index + 1);
    //     setRowNumbers2(numbers2);
    // }, [services]);

    // // Appointments indexes ordered (as ids might be not continuous when some are deleted
    // useEffect(() => {
    //     const numbers3 = appointments.map((_, index) => index + 1);
    //     setRowNumbers3(numbers3);
    // }, [appointments]);


    //button deletes each user by id
    const deleteUser = async (id) => {
        try {
            await DeleteUser(tokenStorage, id);
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
        } catch (error) {
            throw new Error('Failed to delete user: ', error.message);
        }
    };

    // //button deletes each service by id
    // const deleteService = async (id) => {
    //     try {
    //         await DeleteService(tokenStorage, id);
    //         setServices(prevServices => prevServices.filter(service => service.id !== id));
    //     } catch (error) {
    //         throw new Error('Failed to delete service: ', error.message);
    //     }
    // };

    // //button deletes each appointment by id
    // const deleteAppointment = async (id) => {
    //     try {
    //         await DeleteAppointment(tokenStorage, id);
    //         setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== id));
    //     } catch (error) {
    //         throw new Error('Failed to delete appointment: ', error.message);
    //     }
    // };

    const pageCountUsers = Math.ceil(users.length / numUserDisplay); // Calculate total number of pages for users
    // const pageCountServices = Math.ceil(services.length / numServiceDisplay); // Calculate total number of pages for services
    // const pageCountAppointments = Math.ceil(appointments.length / numAppointmentDisplay); // Calculate total number of pages for appointments

    // Pagination controls
    const handlePageClickUsers = ({ selected }) => {
        setCurrentPageU(selected); // Update current page for users
    };
    // const handlePageClickServices = ({ selected }) => {
    //     setCurrentPageS(selected); // Update current page for services
    // };
    // const handlePageClickAppointments = ({ selected }) => {
    //     setCurrentPageA(selected); // Update current page for appointments
    // };

    // Pagination logic
    const indexOfLastUser = currentPageU * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);


    console.log(1, "users: ", users);
    console.log(2, "users.data: ", users.data);
    console.log(3, "userData: ", userData);
    console.log(4, "tokenStorage: ", tokenStorage);
    // const indexOfLastService = currentPageS * servicesPerPage;
    // const indexOfFirstService = indexOfLastService - servicesPerPage;
    // const currentServices = services.slice(indexOfFirstService, indexOfLastService);

    // const indexOfLastAppointment = currentPageA * appointmentsPerPage;
    // const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
    // const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

    const paginateU = (pageNumber1) => setCurrentPageU(pageNumber1);
    // const paginateS = (pageNumber2) => setCurrentPageS(pageNumber2);
    // const paginateA = (pageNumber3) => setCurrentPageA(pageNumber3);

    return (
        <>
            <div className="admin-design">
                <div>
                    {/* USERS */}
                    <div className="div"> USERS: there are a total of {users.length} entries</div>
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr th">
                                <th className="pos">#</th>
                                <th className="username">Username</th>
                                <th className="name">Name</th>
                                <th className="bio">Bio</th>
                                <th className="following">Following</th>
                                <th className="followedBy">Followers</th>
                                <th className="email">e-mail address</th>
                                <th className="createdAt">Register since</th>
                                <th className="role">Role</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentUsers.map((user, index) => (
                                // {users.data.map((user, index) => (
                                <div className={`div ${rowNumbers1[index] % 2 == 0 ? "grayBg" : ""}`} key={user.id}>
                                    <td className="pos">{rowNumbers1[index]}</td>
                                    <td className="username">{user.username}</td>
                                    <td className="name">{user.name}</td>
                                    <td className="bio">{user.bio}</td>
                                    <td className="following">{user.following}</td>
                                    <td className="followedBy">{user.followedBy}</td>
                                    <td className="email">{user.email}</td>
                                    <td className="createdAt">{dayjs(user.createdAt).format("YYYY-MM-DD")}</td>
                                    <td className="role">{user.role.roleName}</td>

                                    <td className="buttons">
                                        <button className="del" onClick={() => deleteUser(user.id)}>delete</button>
                                    </td>
                                    <td className="">
                                        <button className="edit" onClick={() => editUser(user.id)}>edit</button>
                                    </td>
                                </div>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <Pagination
                        className="tbody"
                        currentPage={currentPageU}
                        totalPages={Math.ceil(users.length / usersPerPage)}
                        onPageChange={paginateU}
                    />
                    {/* SERVICES */}
                    {/* 
                        <div className="div"> SERVICES: there are a total of {services.length} entries</div>
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr th">
                                <th className="pos">#</th>
                                <th className="title">Title</th>
                                <th className="description">Description</th>
                                <th className="image">image</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentServices.map((service, index) => (
                                <div className={`div ${rowNumbers2[index] % 2 == 0 ? "grayBg" : ""}`} key={service.id}>
                                    <td className="pos">{rowNumbers2[index]}</td>
                                    <td className="title">{service.serviceName}</td>
                                    <td className="description">{service.description}</td>
                                    <td className="image"><img src={`./src/img/s${service.id <= 4 ? service.id : service.id % 4}.png`} alt={service.id} /></td>
                                    <td className="buttons">
                                        <button className="del" onClick={() => deleteService(service.id)}>delete</button>
                                    </td>
                                    {/* <td className="">
                                        <button className="edit" onClick={() => editService(service.id)}>edit</button>
                                    </td> 
                                </div>
                            ))}
                        </tbody>*/}
                    {/* Pagination */}
                    {/*  <Pagination
                            currentPage={currentPageS}
                            totalPages={Math.ceil(services.length / servicesPerPage)}
                            onPageChange={paginateS}
                        />
                    </table>
*/}
                    {/* APPOINTMENTS */}
                    {/* <div className="div"> APPOINTMENTS: there are a total of {appointments.length} entries</div>
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr th">
                                <th className="pos">#</th>
                                <th className="pos">Id</th>
                                <th className="service">Service</th>
                                <th className="userid">User</th>
                                <th className="day">Date of appointment</th>
                                <th className="time">Hour</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentAppointments.map((appointment, index) => (
                                <div className={`div ${rowNumbers3[index] % 2 == 0 ? "grayBg" : ""}`} key={appointment.id}>
                                    <td className="pos">{rowNumbers3[index]}</td>
                                    <td className="pos">ref.{appointment.id}</td>

                                    <td className="service">{services.find(service => service.id === appointment.serviceId)?.serviceName}</td> */}
                    {/* <td className="user">UserId = {appointment.userId}</td> */}

                    {/* <td className="user">
                                        (id={appointment.userId}){" "}{users.find(user => user.id === appointment.userId)?.lastName},{" "}{users.find(user => user.id === appointment.userId)?.firstName}

                                    </td>

                                    <td className="day">{dayjs(appointment.appointmentDate).format("ddd YYYY-MM-DD")}</td>
                                    <td className="time">{dayjs(appointment.appointmentDate).format("HH:mm")}</td>

                                    <td className="buttons">
                                        <button className="del" onClick={() => deleteAppointment(appointment.id)}>delete</button>
                                    </td> */}
                    {/* <td className="">
                                        <button className="edit" onClick={() => editAppointment(appointment.id)}>edit</button>
                                    </td> */}
                    {/* </div>
                            ))}
                        </tbody> */}
                    {/* Pagination */}
                    {/* <Pagination
                            className="tbody"
                            currentPage={currentPageA}
                            totalPages={Math.ceil(appointments.length / appointmentsPerPage)}
                            onPageChange={paginateA}
                        />
                    </table> 
                     */}
                </div>
            </div >
        </>
    )
}
