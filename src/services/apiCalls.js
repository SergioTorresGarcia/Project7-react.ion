
const root = "http://localhost:4001/api/"


// auth (users)
export const RegisterUser = async (user) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    };

    try {
        const response = await fetch(`${root}auth/register`, options);
        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Register failed: ' + error.message);
    }
};

export const LoginUser = async (credenciales) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credenciales),
    };

    try {
        const response = await fetch(`${root}auth/login`, options);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

// profile
export const GetProfile = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${root}users/profile`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error('Get profile failed: ' + error.message);
    }
};

export const UpdateProfile = async (token, user) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    };
    try {
        const response = await fetch(`${root}users/profile`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        if (!responseData.success) {
            throw new Error(responseData.message);
        }
        return responseData;
    } catch (error) {
        throw new Error('Update profile failed: ' + error.message);
    }
};

// admin > users
export const GetUsers = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${root}users`, options);
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error('Get users failed: ' + error.message);
    }
};

export const DeleteUser = async (token, _id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}users/${_id}`, options)
        if (!response.ok) {
            throw new Error('Failed to delete user: ' + response.statusText);
        }

        const data = await response.json();
        console.log("data", data);
        if (!data.success) {
            throw new Error('Failed to delete user: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Delete user failed: ' + error.message);
    }
}

export const UpdateUser = async (token, _id, newData) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newData)
    }
    try {
        const response = await fetch(`${root}users/${_id}`, options)
        if (!response.ok) {
            throw new Error('Failed to update user: ' + response.statusText);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to update user: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Update user failed: ' + error.message);
    }
}

// admin > posts
export const GetAllPosts = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${root}posts`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error('Get posts failed: ' + error.message);
    }
};

export const CreatePost = async (token, content) => {
    try {
        const response = await fetch(`${root}posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ content })
        });

        if (!response.ok) {
            throw new Error('Failed to create post');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to create post: ' + error.message);
    }
}



export const DeletePost = async (token, x) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    console.log(22, x);
    try {
        const response = await fetch(`${root}posts/${x}`, options)
        console.log(33, x);
        if (!response.ok) {
            throw new Error('Failed to delete post: ' + response.statusText);
        }

        const data = await response.json();
        console.log("data", data);
        if (!data.success) {
            throw new Error('Failed to delete post: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Delete post failed: ' + error.message);
    }
}

export const UpdatePost = async (token, _id, newData) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(newData)
    }
    try {
        const response = await fetch(`${root}posts/${_id}`, options)
        if (!response.ok) {
            throw new Error('Failed to update post: ' + response.statusText);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to update post: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Update post failed: ' + error.message);
    }
}

//probably i can use the fetched posts and filter with userId from token?
export const GetOwnPosts = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${root}posts/own`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error('Get posts failed: ' + error.message);
    }
};

export const GetPostById = async (token, _id) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };

    try {
        const response = await fetch(`${root}posts/${_id}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        return data;
    } catch (error) {
        throw new Error('Get posts failed: ' + error.message);
    }
};

//delete button in admin view


// like/unlike posts

export const likePost = async (_id, token) => {
    try {
        const response = await fetch(`http://localhost:4001/api/posts/${_id}/like`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        console.log("data", data);
        console.log("response", response);
        if (!response.ok) {
            throw new Error('Failed to like/unlike post');
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error('Failed to like/unlike post: ' + error.message);
    }
};
