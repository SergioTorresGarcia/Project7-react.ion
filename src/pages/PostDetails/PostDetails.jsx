import "./PostDetails.css"
import { useNavigate } from "react-router-dom";
import { GetPostById } from "../../services/apiCalls";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { userData } from "../../app/slices/userSlice";
import { likePost } from "../../services/apiCalls";

export const PostDetails = () => {
    const rdxUser = useSelector(userData);
    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const { _id } = useParams();
    const [posts, setPosts] = useState([]);
    const [ownPosts, setOwnPosts] = useState([]);

    const seeDetails = async () => {
        try {
            const response = await GetPostById(tokenStorage, _id);
            setInfo(response.data)
        } catch (error) {
            throw new Error('Cannot see post details:' + error.message);
        }
    }

    useEffect(() => {
        seeDetails(_id)
    }, [_id]);

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
            setInfo(info => info._id === _id ? { ...info, likesCount: data.data.length } : info)
        } catch (error) {
            console.error('Error toggling like/unlike:', error);
        }
    };

    return (
        <>
            <div className="postDetailDesign">
                <div className="details" >

                    {info && (
                        <div className="allDetail">
                            <div className="">
                                {/* <span>Author:</span> */}
                                <div className="top-line">
                                    <div className="left"><span>{` ${info.userId?.profile.name} - ${info.userId?.profile.bio}`}</span></div>
                                </div>


                                <br /><br />
                                <div className="clickableArea" onClick={() => navigate(`/`)}>
                                    <span className="big">❝</span>
                                    <span className="textDetail">{info.content}</span>
                                    <span className="big">❝</span>
                                </div>
                                <br /><br />
                                <div className="down-line">
                                    <div className="left" onClick={() => likeUnlike(_id)}><span>{"🤍 " + (info.likesCount || 0)}</span></div>


                                    {info.likesCount > 0 && <div className="right"><p>Liked by:</p>{info.likes != ""
                                        ? <div> {info.likes.map(name => <span>&nbsp;{name}</span>)} </div>
                                        : ""}</div>}

                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </div >
        </>
    )
}
