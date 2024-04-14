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

    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [ownPosts, setOwnPosts] = useState([]);

    const [dataDetails, setDataDetails] = useState([])
    const [newPostContent, setNewPostContent] = useState("");


    useEffect(() => {
        if (!tokenStorage) {
            navigate("/")
        }
    }, [tokenStorage])

    // fetching info
    useEffect(() => {
        fetchUser();
        fetchPosts();
        setOwnPosts(newPostContent)

    }, []);
    useEffect(() => {


    }, [posts])

    //getting user info
    const fetchUser = async () => {
        try {
            if (!tokenStorage) {
                throw new Error("Token is not available");
            }
            const response = await fetch("http://localhost:4001/api/users/profile", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenStorage}`
                }
            });
            const profile = await response.json();
            setUser(profile.data)
            console.log(user)

        } catch (error) {
            throw new Error('Get posts failed: ' + error.message);
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

    const followUnfollow = async (_id) => {
        try {
            const response = await fetch(`http://localhost:4001/api/users/${_id}/follow`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${tokenStorage}`
                }
            });
            console.log("id", _id);

            if (!response.ok) {
                throw new Error('Failed to follow/unfollow user');
            }

            const data = await response.json();
            console.log(data);
            // setPosts(prevPosts => prevPosts.map(post => post._id === _id ? { ...post, likesCount: data.data.length } : post))
            // setOwnPosts(prevOwnPosts => prevOwnPosts.map(ownPost => ownPost._id === _id ? { ...ownPost, likesCount: data.data.length } : ownPost))
        } catch (error) {
            console.error('Error toggling follow/unfollow:', error);
        }
    };

    const handleCreatePost = async () => {
        try {
            if (!newPostContent.trim()) {
                // alert("To post you need to write something");
                console.log("To post you need to write something");
                throw new Error('No');
            }

            // Call the API to create a new post
            const post = await CreatePost(tokenStorage, newPostContent);
            console.log(post);
            // Emptying the input field
            setNewPostContent("");
        } catch (error) {
            console.error('Error creating post:', error);
            // alert("New post failed");
            throw new Error('Failed to like/unlike post');
        }
    };

    const photoId = (user && user._id && user._id.toString().slice(-1)) || 'default_value';

    return (
        <div className="home-design">

            {rdxUser?.credentials?.token ? (
                <div className="home-design">
                    {/* add a post function on top: either textarea or input */}
                    <div className="new-post">

                        {/* TBD - create post */}


                        <div className="newPost-btn"> {/* <div className="new-post"> */}
                            <input
                                value={newPostContent}
                                type="text"
                                name="content"
                                onChange={(e) => setNewPostContent(e.target.value)}
                                placeholder={`What do you wanna share, ${rdxUser.credentials.user.username}?`}
                                className="new-post"
                            />
                            {/* <input
                                placeholder={`What do you wanna share, ${rdxUser.credentials.user.username}?`}
                                className="new-post-input"
                                type="text"
                                name="content"
                            // value={newPost.content}
                            // onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            /> */}
                        </div>
                        <div className="btn-create" onClick={handleCreatePost}>PUBLISH</div>

                        {/* <div className="btn-create">
                            PUBLISH
                        </div> */}

                    </div>
                    <div className="underNewPost">
                        {/* <div className="left-part"> */}
                        <div className="profile-box">
                            <div className="profile">
                                <div className="user"><span className="real">{user?.username}&nbsp;&nbsp;</span>|&nbsp;&nbsp;{user?.profile?.name}</div>
                                <div className="bio" >"{user?.profile?.bio}"</div>
                                <br />
                                <img className="profilePic" src={`https://picsum.photos/id/${photoId}/300/300`} alt="profile" />
                                <br />
                            </div>

                            <div className="fol" >{user?.following?.length > 0 && <div className="right"><p>You follow:</p>{user.following != []
                                ? <div> {user.following.map(name => <p>{name}&nbsp;</p>)} </div>
                                : "Not following anyone"}</div>}</div>




                            <div className="fol" >{user?.followedBy?.length > 0 && <div className="right"><p>Followers:</p>{user.followedBy != []
                                ? <div> {user.followedBy.map(name => <p>{name}&nbsp;</p>)} </div>
                                : "No followers"}</div>}</div>
                            <br />
                        </div>
                        {/* </div> */}

                        {/* ALL POSTS - MISSING 'CREATE POST' and 'DETAIL' and pictures? */}
                        <div className="center-part">
                            {/* timeline (all posts - mapping cards) */}
                            <div className="timeline">
                                <div className="cardGroup">
                                    {posts?.map((item) => (
                                        < CCard
                                            key={item._id}
                                            _id={item._id}
                                            className="card-design"
                                            username={`-- ${item.userId?.username} --`}
                                            content={item.content || "null"}

                                            // likesCount={
                                            //     item.likes?.includes(item.userId?.username)
                                            //         ? <span><a href="#">{`💜  ${item.likesCount} likes`}</a></span>
                                            //         : <span><a href="#">{`🤍  ${item.likesCount} likes`}</a></span>
                                            // }
                                            likesCount={"💜 " + (item.likesCount || 0) + " likes"}

                                            follow={item.userId?.following.includes(item.userId?.username) ? <span><a href="#">❌ unfollow</a></span> : <span> <a className="plus" href="#">+ follow</a></span>}


                                            emitFunction={() => likeUnlike(item._id)}
                                            emitFunction2={() => followUnfollow(item._id)}
                                            onClick={() => seeDetails(item._id)}
                                        // imageUrl={item.imageUrl} // {`https://picsum.photos/${item._id.slice(-3)}` || ""}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* OWN POSTS - MISSING 'DETAIL' and pictures? */}
                        <div className="right-part">
                            {/* <div className="white-color newPost-btn"> * {`You have published ${ownPosts.length} posts`} * </div> */}

                            <div className="my-posts">
                                {ownPosts?.length > 0 ?
                                    ownPosts.map((item) => (
                                        <CCard
                                            key={item._id}
                                            _id={item._id}
                                            className="card-design-2"
                                            content={item.content}
                                            likesCount={(item.likesCount || 0) + " 💜"}
                                            onClick={() => seeDetails(item._id)}

                                        // imageUrl={`https://picsum.photos/${item._id.slice(-3)}`
                                        //     ? `https://picsum.photos/${item._id.slice(-3)}`
                                        //     : null}
                                        />
                                    )) : <div className="no-posts">YOU <br /> HAVEN'T <br /> PUBLISHED <br /> ANYTHING <br /> YET</div>}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // WHEN YOU ARE NOT LOGGED IN, BIG GIF IS SHOWING
                <div className="gif-box">
                    <img className="gif" src="src/img/REACT.ION (1).gif" alt="gif logo" />
                </div>
            )}
        </div>
    )
};