
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CInput } from "../../common/CInput/CInput";
import { CButton } from "../../common/CButton/CButton";
import { postData } from "../../app/slices/postSlice";
import "./PostDetails.css"

export const PostDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const rdxUser = useSelector(postData);
    const { _id } = useParams();

    const [post, setPost] = useState({
        userId: "",
        content: "",
    });

    const [userError, setUserError] = useState({
        userIdError: "",
        contentError: "",
    });

    const [loadedData, setLoadedData] = useState(false);

    const [tokenStorage, setTokenStorage] = useState(rdxUser.credentials.token);

    useEffect(() => {
        const getPostDetailsFromAPI = async (_id) => {
            try {
                const fetchedPost = await UpdatePost(tokenStorage, _id, {});

                setPost(fetchedPost.data);
                setLoadedData(false);
            } catch (error) {
                console.error('Error fetching post details:', error);
            }
        };

        getPostDetailsFromAPI(_id);
    }, [_id, tokenStorage]);

    const inputHandler = (e) => {
        setPost((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const updatePost = async () => {
        try {
            await UpdatePost(tokenStorage, _id, post);
            navigate(`/admin`);
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="post-detail-design">
            <h2 className="white-color behind">Edit post</h2>
            <label className="white-color">User Id</label>
            {/* <CInput
                className="input-design"
                type="text"
                placeholder="userId"
                name="_id"
                value={user._id}
                disabled="disabled"
                changeEmit={(e) => inputHandler(e)}
            /> */}
            <label className="white-color">Username</label>
            {/* <CInput
                className="input-design border-edit"
                type="text"
                placeholder="username"
                name="username"
                value={user.username}
                changeEmit={(e) => inputHandler(e)}
            /> */}
            <label className="white-color">Name</label>
            {/* <CInput
                className="input-design border-edit"
                type="text"
                placeholder="your name"
                name="name"
                value={user.profile.name}
                changeEmit={(e) => inputHandler(e)}
            /> */}
            <label className="white-color">Bio</label>
            {/* <CInput
                className="input-design border-edit"
                type="text"
                placeholder="write something about you"
                name="bio"
                value={user.profile.bio}
                changeEmit={(e) => inputHandler(e)}
            /> */}
            <label className="white-color">Email</label>
            {/* <CInput
                className="input-design"
                type="email"
                placeholder=""
                name="email"
                disabled="disabled"
                value={user.email}
                changeEmit={(e) => inputHandler(e)}
            /> */}

            <CButton
                className="btn cButtonDesign behind"
                title="Save changes"
                functionEmit={updatePost}
            />
        </div>
    );
};

