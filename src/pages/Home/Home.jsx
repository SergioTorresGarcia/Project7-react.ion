import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";

import { useNavigate } from "react-router-dom";
import CCard from "../../common/CCard/CCard";
import { CreatePost, GetAllPosts, GetPostById } from "../../services/apiCalls";
import { CTextarea } from "../../common/CTextarea/CTextarea";

import { likePost } from "../../services/apiCalls";

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
        content: '',
        // userId: tokenStorage
        // likes: [],
        // likesCount: 0
    });


    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

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
            setOwnPosts(postsData.data.filter(post => post.userId?._id === rdxUser.credentials.user.userId))
        } catch (error) {
            throw new Error('Get posts failed: ' + error.message);
        }
    };

    const seeDetails = async (_id) => {
        try {
            navigate(`/postDetails/${_id}`)
        } catch (error) {
            throw new Error('Cannot see post details:' + error.message);
        }
    }

    const likeUnlike = async (_id) => {
        try {
            const response = await fetch(`http://localhost:4001/api/posts/${_id}/like`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenStorage}`
                }
            });
            console.log("id", _id);

            if (!response.ok) {
                throw new Error('Failed to like/unlike post');
            }

            const data = await response.json();
            console.log(data);
            setPosts(prevPosts => prevPosts.map(post => post._id === _id ? { ...post, likesCount: data.data.length } : post))
            setOwnPosts(prevOwnPosts => prevOwnPosts.map(ownPost => ownPost._id === _id ? { ...ownPost, likesCount: data.data.length } : ownPost))
        } catch (error) {
            console.error('Error toggling like/unlike:', error);
        }
    };

    return (
        <div className="home-design">
            {/* <img className="gif" src="src/img/REACT.ION.gif" alt="gif logo" /> */}

            {rdxUser?.credentials?.token ? (
                <div className="home-design">
                    {/* TO BE DONE */}
                    <div className="left-part">
                        <span>user's data:</span>
                        <span>- followers list</span>
                        <span>- following list</span>
                        <span>- number of posts</span>

                    </div>

                    {/* ALL POSTS - MISSING 'CREATE POST' and 'DETAIL' and pictures? */}
                    <div className="center-part">
                        {/* add a post function on top: either textarea or input */}
                        <div className="new-post">
                            <div className="textarea-placehold">{`What do you wanna share, ${rdxUser.credentials.user.username}?`}</div>

                            {/* TBD - create post */}
                            <span className="newPost-btn">
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

                                <div> {/* onClick={(e) => handleCreatePost(e)} */}
                                    CREATE NEW POST
                                </div>
                            </span>
                        </div>

                        {/* timeline (all posts - mapping cards) */}
                        <div className="white-color"> * Your timeline * </div>
                        <div className="timeline">
                            {/* <div>all posts from all users</div>
                                <div>extra detail (modal/popup??)</div>
                                <div>like/unlike buttons</div> */}

                            <div className="cardGroup">

                                {posts.map((item) => (

                                    < CCard
                                        key={item._id}
                                        _id={item._id}
                                        className="card-design"
                                        username={`-- ${item.userId?.username} --`}
                                        content={item.content || "null"}
                                        likesCount={"💜 " + (item.likesCount || 0) + " likes"}  //♥️  🤍
                                        follow={item.userId?.following.includes(item.userId.username) ? <span><a href="#">❌</a> unfollow</span> : <span> <a href="#">➕</a> follow</span>}
                                        // emitFunction={() => like(item._id)}
                                        emitFunction={() => likeUnlike(item._id)}
                                        onClick={() => seeDetails(item._id)}

                                    // imageUrl={item.imageUrl} // {`https://picsum.photos/${item._id.slice(-3)}` || ""}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* OWN POSTS - MISSING 'DETAIL' and pictures? */}
                    <div className="right-part">
                        <div className="white-color newPost-btn"> * {`You have published ${ownPosts.length} posts`} * </div>

                        <div className="my-posts">
                            {ownPosts.map((item) => (
                                <CCard
                                    key={item._id}
                                    _id={item._id}
                                    className="card-design-right small-card"
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
    )
};