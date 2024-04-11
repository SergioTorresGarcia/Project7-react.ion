import "./Home.css";

import { useDispatch, useSelector } from "react-redux";
import { searchData } from "../../app/slices/searchSlice";
import { useEffect, useState } from "react";
import { userData } from "../../app/slices/userSlice";
import { useNavigate } from "react-router-dom";
// import CCard from "../../common/CCard/CCard";
import { CreatePost } from "../../services/apiCalls";
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


    return (

        <div className="home-design">
            {/* temporary until i resolve the ternaria below */}
            {/* <img className="gif" src="src/img/REACT.ION.gif" alt="gif logo" /> */}




            <div className="group">
                {rdxUser?.credentials?.token ? (
                    <div>
                        <CTextarea
                            type="text"
                            name="content"
                            value={newPost.content}
                            // disabled={disabled}
                            onChangeFunction={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            className="btn1"
                        // maxLength={maxLength}
                        />

                        {/* <span>
                        
                            <input
                                placeholder="what do you wanna share?"
                                className="btn1"
                                type="text"
                                name="content"
                                value={newPost.content}
                                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                            />
                        </span> */}
                        <span>
                            <button className="newPostBtn" onClick={handleCreatePost}>
                                CREATE NEW POST
                            </button>
                        </span>
                    </div>
                ) : (
                    <div>
                        <img className="gif" src="src/img/REACT.ION.gif" alt="gif logo" />
                    </div>
                )}
            </div>



            {/* <div className="cardGroup">
                    {posts.map((item) => (
                        <CCard
                            id={item._id}
                            key={item._id}
                            content={item.content}
                            userId={item.userId}
                            onClick={() => seeDetails(item._id)}
                            // there are only 4 pics that repeat periodically
                            imageUrl={`../img/logo_dark.png`} //{`../img/s${item.id <= 4 ? item.id : item.id % 4}.png`}
                        />
                    ))}
                </div> */}

        </div>
    )
};