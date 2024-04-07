
const root = "http://localhost:4001/api/"


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

export const GetProfile = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    console.log("token in apiCalls:", token);

    try {
        const response = await fetch(`${root}users/profile`, options);
        if (!response.ok) {
            console.log("response failed:", response);
            throw new Error('Network response was not ok');
        }
        console.log("response", response);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        console.log("data (res.json() )", data);
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

export const GetUsers = async (token) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    };
    console.log("token in apiCalls:", token);

    try {
        const response = await fetch(`${root}users`, options);
        if (!response.ok) {
            console.log("response failed:", response);
            throw new Error('Network response was not ok');
        }
        console.log(111, "response", response);
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.message);
        }
        console.log(22222, "data (res.json() )", data);
        return data;
    } catch (error) {
        throw new Error('Get users failed: ' + error.message);
    }
};

export const DeleteUser = async (token, id) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }
    try {
        const response = await fetch(`${root}users/${id}`, options)
        if (!response.ok) {
            throw new Error('Failed to delete user: ' + response.statusText);
        }

        const data = await response.json();
        if (!data.success) {
            throw new Error('Failed to delete user: ' + data.message);
        }
        return data;

    } catch (error) {
        throw new Error('Delete user failed: ' + error.message);
    }
}