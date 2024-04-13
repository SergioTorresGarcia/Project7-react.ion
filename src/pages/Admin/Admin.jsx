import "./Admin.css";
import { searchData } from "../../app/slices/searchSlice";
import { userData, deleteUserById, updateUserById } from "../../app/slices/userSlice";

import { FaTrash, FaEdit } from 'react-icons/fa'; // Import icons

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetUsers, DeleteUser, UpdateUser, DeletePost, GetAllPosts, UpdatePost } from "../../services/apiCalls";
import dayjs from "dayjs";
import { Pagination } from "../../common/Pagination/Pagination";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { CInput } from "../../common/CInput/CInput";

const numUserDisplay = 5;
const numPostDisplay = 5;

export const Admin = () => {


    //Instancia de Redux en modo lectura para home
    const searchRdx = useSelector(searchData);

    useEffect(() => {
        console.log(searchRdx);
    }, [searchRdx]);

    //Instancia de Redux para escritura y lectura (see and edit profile)
    const dispatch = useDispatch();
    const rdxUser = useSelector(userData);

    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);

    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    const [rowNumbers1, setRowNumbers1] = useState([]);
    const [rowNumbers2, setRowNumbers2] = useState([]);

    const [roleStorage, setRoleStorage] = useState(rdxUser?.credentials.user.roleName);

    const [currentPageU, setCurrentPageU] = useState(1);
    const [currentPageP, setCurrentPageP] = useState(1);

    const [usersPerPage] = useState(numUserDisplay); // Number of users per page
    const [postsPerPage] = useState(numPostDisplay); // Number of appointments per page

    // control admin access only
    useEffect(() => {
        if (roleStorage !== 'superadmin') {
            navigate("/admin")
        }
    }, [])

    // fetching info
    useEffect(() => {
        fetchUsers();
        fetchPosts();
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

    // geting posts
    const fetchPosts = async () => {
        try {
            if (!tokenStorage) {
                throw new Error("Token is not available");
            }

            const postsData = await GetAllPosts(tokenStorage);
            setLoadedData(true)
            setPosts(postsData.data)
        } catch (error) {
            throw new Error('Get posts failed: ' + error.message);
        }
    };

    // Users indexes ordered (as ids might be not continuous when some are deleted
    useEffect(() => {
        const numbers1 = users.map((_, index) => index + 1);
        setRowNumbers1(numbers1);
    }, [users]);

    // Posts indexes ordered (as ids might be not continuous when some are deleted)
    useEffect(() => {
        const numbers2 = posts.map((_, index) => index + 1);
        setRowNumbers2(numbers2);
    }, [posts]);


    //button deletes each user by id
    const deleteUser = async (_id) => {
        console.log(_id);
        try {
            await DeleteUser(tokenStorage, _id);
            setUsers(prevUsers => prevUsers.filter(user => user._id !== _id));
        } catch (error) {
            throw new Error('Failed to delete user: ', error.message);
        }
    };

    //button deletes each appointment by id
    const deletePost = async (_id) => {
        console.log(_id);
        try {
            await DeletePost(tokenStorage, _id);
            setPosts(prevPosts => prevPosts.filter(post => post._id !== _id));
        } catch (error) {
            throw new Error('Failed to delete post: ', error.message);
        }
    };


    const editUser = async (_id) => {
        try {
            const responseDetails = await UpdateUser(tokenStorage, _id);
            navigate(`/userDetails/${_id}`)
        } catch (error) {
            throw new Error('Cannot see user details:' + error.message);
        }
    }

    const editPost = async (_id) => {
        try {
            const responseDetails = await UpdatePost(tokenStorage, _id);
            navigate(`/admin`)
        } catch (error) {
            throw new Error('Error updating post:' + error.message);
        }
    }


    const pageCountUsers = Math.ceil(users.length / numUserDisplay); // Calculate total number of pages for users
    const pageCountPosts = Math.ceil(posts.length / numPostDisplay); // Calculate total number of pages for posts

    // Pagination controls
    const handlePageClickUsers = ({ selected }) => {
        setCurrentPageU(selected); // Update current page for users
    };
    const handlePageClickPosts = ({ selected }) => {
        setCurrentPageP(selected); // Update current page for posts
    };

    // Pagination logic
    const indexOfLastUser = currentPageU * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    const indexOfLastPost = currentPageP * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginateU = (pageNumber1) => setCurrentPageU(pageNumber1);
    const paginateP = (pageNumber2) => setCurrentPageP(pageNumber2);

    return (
        <>
            <div className="admin-design">
                <div className="div">
                    {/* USERS */}
                    <div className="title"> USERS: there are a total of {users.length} entries</div>
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="box width-2">#</th>
                                <th className="box width-5">Id</th>
                                <th className="box width-20">Username</th>
                                <th className="box width-10">Following</th>
                                <th className="box width-10">Followers</th>
                                <th className="box width-20">E-mail address</th>
                                <th className="box width-10">Registered since</th>
                                <th className="width-5">Actions</th>

                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentUsers.map((user, index) => (
                                <tr className={`tr ${rowNumbers1[index] % 2 == 0 ? "grayBg" : ""}`} key={user._id}>
                                    <td className="box width-2">{rowNumbers1[index]}</td>
                                    <td className="box width-5">{user._id.slice(-3)}</td>
                                    <td className="box width-20">{user.username}</td>
                                    <td className="box width-10">{user.following != "" ? user.following : "none"}</td>
                                    <td className="box width-10">{user.followedBy != "" ? user.followedBy : "none"}</td>
                                    <td className="box width-20">{user.email}</td>
                                    <td className="box width-10">{dayjs(user.createdAt).format("YYYY-MM-DD")}</td>
                                    <td className="width-5 btns">
                                        <FaEdit className="icon" onClick={() => editUser(user._id)} />
                                        <FaTrash className="icon" onClick={() => deleteUser(user._id)} />
                                    </td>
                                </tr>
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

                    {/* POSTS */}
                    <div className="title"> POSTS: there are a total of {posts.length} entries</div>
                    <table className="table">
                        <thead className="thead">
                            <tr className="tr">
                                <th className="box width-2">#</th>
                                <th className="box width-5">PostId</th>
                                <th className="box width-5">UserId</th>
                                <th className="box width-10">Username</th>
                                <th className="box width-50">Content</th>
                                <th className="box width-15">Post's likes</th>
                                <th className="box width-2">💜</th>
                                {/* <th className="box width-10">post.id</th> */}
                                <th className="width-5">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {currentPosts.map((post, index) => (
                                <tr className={`tr ${rowNumbers2[index] % 2 == 0 ? "grayBg" : ""}`} key={post._id}>
                                    <td className="box width-2">{rowNumbers2[index]}</td>
                                    <td className="box width-5">{post._id.slice(-3)}</td>
                                    <td className="box width-5">{post.userId?._id.slice(-3)}</td>
                                    <td className="box width-10">{post.userId?.username}</td>
                                    <td className="box width-50">{post.content}
                                        {/* <CInput
                                            className="box width-50"
                                            type="textArea"
                                            placeholder=""
                                            name="content"
                                            disabled="disabled"
                                            value={post.content}
                                            onChange={(event) => changeEmit(event)}
                                        /> */}
                                    </td>
                                    <td className="box width-15">{post.likes != "" ? post.likes : "none"}</td>
                                    <td className="box width-2">{post.likesCount || 0}</td>
                                    {/* <td className="box width-10">{post._id}</td> */}

                                    {/* <td className="service">{posts.find(name => user.id === post.userId)?.username}</td> */}


                                    {/* <td className="day">{dayjs(appointment.appointmentDate).format("ddd YYYY-MM-DD")}</td>
                                    <td className="time">{dayjs(appointment.appointmentDate).format("HH:mm")}</td> */}

                                    {/* <td className="buttons">
                                        <button className="del" onClick={() => deletePost(post.id)}>delete</button>
                                    </td>
                                    <td className="">
                                        <button className="edit" onClick={() => editPost(post.id)}>edit</button>
                                    </td> */}
                                    <td className="width-5 btns">
                                        <FaEdit className="icon" onClick={() => editPost(post._id)} />
                                        <FaTrash className="icon" onClick={() => deletePost(post._id)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <Pagination
                        className="colors"
                        currentPage={currentPageP}
                        totalPages={Math.ceil(posts.length / postsPerPage)}
                        onPageChange={paginateP}
                    />
                </div>
            </div >
        </>
    )
}

