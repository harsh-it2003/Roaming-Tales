import axios from "axios";

const url = process.env.REACT_APP_URL;


export const getAllPosts = async () => {
    try {
        const res = await axios.get(`${url}/posts`);
        const data = res.data;
        return data;

    } catch (err) {
        throw new Error(err);
    }
}


export const doAuthentication = async (isLogin, data) => {
    try {
        // here when axios requests the server to signup/login, the status code is being checked, if it is an error status, then it goes to catch block directly with the error, otherwise the res variable will get the response data.
        let res = await axios.post(`${url}/user/${isLogin ? "login" : "signup"}`, {
            name: data.name ? data.name : "",
            email: data.email,
            password: data.password
        })
        const resData = await res.data;
        return resData;
    }
    catch (err) {
        throw new Error("Unable To authenticate");
    }
}

export const postAPost = async (data) => {
    try {
        const res = await axios.post(`${url}/posts/`, {
            // title, description, image, location, date, user 
            title: data.title,
            description: data.description,
            image: data.imageURL,
            location: data.location,
            date: data.date,
            user: localStorage.getItem("userId"),
            comments: []
        });

        const resData = await res.data;
        return resData;

    } catch (err) {
        throw new Error(err);
    }
}


export const getDetailsOfAPost = async (id) => {
    try {
        const res = await axios.get(`${url}/posts/${id}`);

        const resData = await res.data;
        return resData;

    } catch (err) {
        throw new Error(err);
    }
};


export const updatePost = async (id, data) => {
    try {
        const res = await axios.put(`${url}/posts/${id}`, {
            title: data.title,
            description: data.description,
            image: data.imageURL,
            location: data.location,
            date: data.date,
        });

        const resData = await res.data;
        return resData;

    } catch (err) {
        throw new Error(err);
    }
}


export const deletePost = async (id) => {
    try {
        const res = await axios.delete(`${url}/posts/${id}`);
        const resData = await res.data;
        return resData;

    } catch (err) {
        throw new Error(err);
    }
}


export const getUserById = async (id) => {
    try {
        const res = await axios.get(`${url}/user/${id}`);
        const resData = res.data;
        return resData;
    } catch (err) {
        console.log("in catch err");
        throw new Error(err);
    }
}



// api-helpers/helpers.js

// Existing helper functions...

export const getPostComments = async (postId) => {
    try {
        const response = await axios.get(`${url}/posts/${postId}/comments`);
        const {comments} = response.data;
        return comments;
    } catch (error) {
        throw error;
    }
};

export const addCommentToPost = async (postId, comment) => {
    try {
        const response = await axios.post(`${url}/posts/${postId}/comments`, {comment});
        return response.data;
    } catch (error) {
        throw error;
    }
};

