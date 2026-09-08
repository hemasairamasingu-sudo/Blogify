import {
    useEffect,
    useState
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import API from "../services/api";

function EditPost() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [title, setTitle] =
        useState("");

    const [content, setContent] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchPost();

    }, [id]);

    const fetchPost = async () => {

        try {

            const response =
                await API.get(
                    `/posts/${id}`
                );

            setTitle(
                response.data.title
            );

            setContent(
                response.data.content
            );

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token =
                localStorage.getItem("token");

            await API.put(
                `/posts/${id}`,
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
                `/posts/${id}`
            );

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to update post"
            );
        }
    };

    if (loading) {
        return (
            <div className="container">
                Loading...
            </div>
        );
    }

    return (
        <div className="container">

            <div className="form-card">

                <h1>
                    Edit Post
                </h1>

                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Title
                    </label>

                    <input
                        type="text"
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
                        value={content}
                        onChange={(e) =>
                            setContent(e.target.value)
                        }
                        required
                    />

                    <button type="submit">
                        Update Post
                    </button>

                </form>

            </div>

        </div>
    );
}

export default EditPost;