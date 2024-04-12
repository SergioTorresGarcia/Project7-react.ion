import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { postData } from "../../app/slices/postSlice";
import { useNavigate } from "react-router-dom";
import CCard from "../../common/CCard/CCard";
import { CreatePost, GetAllPosts } from "../../services/apiCalls";
import { CTextarea } from "../../common/CTextarea/CTextarea";
export const Home = () => {
    //Instancia de Redux en modo lectura para home
    // const rdxSearch = useSelector(searchData);

    // useEffect(() => {
    //     console.log(rdxSearch);
    // }, [rdxSearch]);
    ///

    //Instancia de Redux para escritura y lectura (see and edit profile)
    const dispatch = useDispatch();
    const rdxUser = useSelector(userData);
    const navigate = useNavigate();
    const [loadedData, setLoadedData] = useState(false);
    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);

    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [ownPosts, setOwnPosts] = useState([]);

    const [dataDetails, setDataDetails] = useState([])
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


    // const postContent = newPost
    // const userId = tokenStorage
    // const handleCreatePost = async () => {
    //     try {
    //         await CreatePost(userId, postContent);
    //         // console.log(3, postContent);
    //         // If the post is created successfully, we clear the input field
    //         // setNewPost({ content: '' });
    //         // setNewPost('');  // alternative to warning??
    //     } catch (error) {
    //         console.error('Error creating post:', error);
    //     }
    // };


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
            setOwnPosts(postsData.data.filter(post => post.userId._id === rdxUser.credentials.user.userId))
        } catch (error) {
            throw new Error('Get posts failed: ' + error.message);
        }
    };

    const seeDetails = async (_id) => {
        try {
            const responseDetails = await GetPostById(_id);

            setDataDetails(responseDetails.data)
            navigate(`/postDetails/${_id}`)
        } catch (error) {
            throw new Error('Cannot see post details:' + error.message);
        }
    }

    return (
        // <div className="home-design">hey</div>
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
                                <div className="textarea-placehold">{`What do you wanna share, ${rdxUser.credentials.user.username}?`}</div>
                                {/* <CTextarea
                                    type="text"
                                    name="content"
                                    value={newPost.content}
                                    placeholder={`What do you wanna share, ${rdxUser.credentials.user.username}?`}
                                    // onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                    className="textareaDesign"
                                /> */}
                                {/* <span><input
                                    placeholder="what do you wanna share?"
                                    className="btn1"
                                    type="text"
                                    name="content"
                                    value={newPost.content}
                                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                                /></span> */}
                                <span className="newPost-btn">
                                    <div> {/* onClick={(e) => handleCreatePost(e)} */}
                                        CREATE NEW POST
                                    </div>
                                </span>
                            </div>




                            {/* timeline (all posts - mapping cards) */}

                            <div className="white-color newPost-btn"> * Your timeline * </div>
                            <div className="timeline">
                                {/* <div>all posts from all users</div>
                                <div>extra detail (modal/popup??)</div>
                                <div>like/unlike buttons</div> */}

                                <div className="cardGroup">

                                    {posts.map((item) => (
                                        < CCard
                                            id={item._id}
                                            className="card-design"
                                            key={item._id}
                                            username={`-- ${item.userId.username} --`}
                                            content={item.content}
                                            // userId={item.userId._id}
                                            likesCount={"💜 " + (item.likesCount || 0) + " likes"}  //♥️  🤍
                                            follow={item.userId.following.includes(item.userId.username) ? <span><a href="#">❌</a> unfollow</span> : <span> <a href="#">➕</a> follow</span>}
                                            onClick={() => seeDetails(item._id)}
                                        // imageUrl={item.imageUrl} // {`https://picsum.photos/${item._id.slice(-3)}` || ""}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="right-part">
                            <div className="white-color newPost-btn"> * {`You have published ${ownPosts.length} posts`} * </div>

                            <div className="my-posts">
                                {ownPosts.map((item) => (
                                    <CCard
                                        className="card-design-right small-card"
                                        id={item._id}
                                        key={item._id}
                                        content={item.content}
                                        likesCount={(item.likesCount || 0) + " 💜"}
                                        onClick={() => seeDetails(item._id)}

                                    // imageUrl={`https://picsum.photos/${item._id.slice(-3)}`
                                    //     ? `https://picsum.photos/${item._id.slice(-3)}`
                                    //     : null}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    // WHEN YOU ARE NOT LOGGED IN, BIG GIF IS SHOWING
                    <div>
                        <img className="gif" src="src/img/REACT.ION.gif" alt="gif logo" />
                    </div>
                )}
            </div>





        // </div>
    )
};