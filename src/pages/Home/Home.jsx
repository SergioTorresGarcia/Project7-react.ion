import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
import CCard from "../../common/CCard/CCard";
import { CreatePost, GetAllPosts } from "../../services/apiCalls";
import { CTextarea } from "../../common/CTextarea/CTextarea";
export const Home = () => {
    //Instancia de Redux en modo lectura para home
    const searchRdx = useSelector(searchData);

    useEffect(() => {
        console.log(searchRdx);
    }, [searchRdx]);
    ///

    //Instancia de Redux para escritura y lectura (see and edit profile)
    const dispatch = useDispatch();
    const rdxUser = useSelector(userData);
    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);
    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);

    const [newPost, setNewPost] = useState({
        content: '', // Initialize postContent as an empty string
        // userId: tokenStorage
        // likes: [],
        // likesCount: 0
    });


    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])


    // const [users, setUsers] = useState([]);
    // const [posts, setPosts] = useState([]);

    const postContent = newPost
    const userId = tokenStorage
    const handleCreatePost = async () => {
        try {
            await CreatePost(userId, postContent);
            console.log(3, postContent);
            // If the post is created successfully, we clear the input field
            setNewPost({ content: '' });
            // setNewPost('');  // alternative to warning??
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    // fetching info
    useEffect(() => {
        // fetchUsers();
        fetchPosts();
    }, []);

    // geting posts
    const fetchPosts = async () => {
        try {
            if (!tokenStorage) {
                throw new Error("Token is not available");
            }

            const postsData = await GetAllPosts(tokenStorage);
            setLoadedData(true)
            setPosts(postsData.data)
            console.log(1, "username", postsData.data[0].userId.username);

        } catch (error) {
            // throw new Error('Get posts failed: ' + error.message);
        }
    };
    console.log(posts);


    return (

        <div className="home-design">
            {/* temporary until i resolve the ternaria below */}
            {/* <img className="gif" src="src/img/REACT.ION.gif" alt="gif logo" /> */}




            <div className="group">
                {rdxUser?.credentials?.token ? (
                    <div className="home-design">
                        <div className="left-part">
                            <span>user's data:</span>
                            <span>- followers list</span>
                            <span>- following list</span>
                            <span>- number of posts</span>

                        </div>

                        <div className="center-part">
                            {/* add a post function on top: either textarea or input */}
                            <div className="new-post">
                                <CTextarea
                                    type="text"
                                    name="content"
                                    value={newPost.content}
                                    placeholder="What do you wanna share?"
                                    // disabled={disabled}
                                    onChangeFunction={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    className="textareaDesign"
                                // maxLength={maxLength}
                                />
                                {/* <span><input
                                    placeholder="what do you wanna share?"
                                    className="btn1"
                                    type="text"
                                    name="content"
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                /></span> */}
                                <span className="newPost-btn">
                                    <div onClick={handleCreatePost}>
                                        CREATE NEW POST
                                    </div>
                                </span>
                            </div>
                            <br />
                            {/* timeline (all posts - mapping cards) */}


                            <div className="timeline">
                                {/* <div>all posts from all users</div>
                                <div>extra detail (modal/popup??)</div>
                                <div>like/unlike buttons</div> */}

                                <div className="cardGroup">
                                    {posts.map((item) => (
                                        <CCard
                                            id={item._id}
                                            key={item._id}
                                            content={item.content.slice(0, 25)}
                                            userId={item.userId._id}
                                            onClick={() => seeDetails(item._id)}
                                            // there are only 4 pics that repeat periodically
                                            imageUrl={`../img/logo_dark.png`} //{`../img/s${item.id <= 4 ? item.id : item.id % 4}.png`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="right-part">
                            <span>posts' data:</span>
                            <span>- all my posts CRUD </span>
                            <span>- number of posts </span>
                            <span>- number of likes </span>
                            <span>- how to organized them?</span>
                        </div>
                    </div>
                ) : (
                    // WHEN YOU ARE NOT LOGGED IN, BIG GIF IS SHOWING
                    <div>
                        <img className="gif" src="src/img/REACT.ION.gif" alt="gif logo" />
                    </div>
                )}
            </div>





        </div>
    )
};