import {
    useState,
    useContext
} from "react";

import {
    useNavigate
} from "react-router-dom";

import API from "../services/api";

import {
    AuthContext
} from "../context/AuthContext";

function CreatePost() {

    const navigate = useNavigate();

    const { user } =
        useContext(AuthContext);

    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!user) {
            navigate("/login");
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await API.post(
                    "/posts",
                    {
                        title,
                        content
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            navigate(
                `/posts/${response.data._id}`
            );

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Unable to create post"
            );
        }
    };

    return (
        <div className="container">

            <div className="form-card">

                <h1>
                    Create New Post
                </h1>

                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Title
                    </label>

                    <input
                        type="text"
                        placeholder="Enter post title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                    <label>
                        Content
                    </label>

                    <textarea
                        rows="12"
                        placeholder="Write your blog..."
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        required
                    />

                    {error && (
                        <p className="error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                    >
                        Publish Post
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreatePost;