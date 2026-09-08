import {
    useEffect,
    useState,
    useContext
} from "react";

import {
    useNavigate,
    useParams
} from "react-router-dom";

import API from "../services/api";

import CommentForm
    from "../components/CommentForm";

import CommentList
    from "../components/CommentList";

import {
    AuthContext
} from "../context/AuthContext";

function PostDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const { user } =
        useContext(AuthContext);

    const [post, setPost] =
        useState(null);

    const [comments, setComments] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        fetchPost();

        fetchComments();

    }, [id]);

    const fetchPost = async () => {

        try {

            const response =
                await API.get(
                    `/posts/${id}`
                );

            setPost(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

    const fetchComments = async () => {

        try {

            const response =
                await API.get(
                    `/comments/${id}`
                );

            setComments(response.data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleCommentAdded =
        (newComment) => {

        setComments([
            newComment,
            ...comments
        ]);
    };

    const handleCommentDeleted =
        (commentId) => {

        setComments(
            comments.filter(
                comment =>
                    comment._id !== commentId
            )
        );
    };

    const deletePost = async () => {

        if (!window.confirm(
            "Are you sure you want to delete this post?"
        )) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            await API.delete(
                `/posts/${id}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            navigate("/");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete post"
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

    if (!post) {

        return (
            <div className="container">
                <h2>
                    Post not found
                </h2>
            </div>
        );
    }

    const isOwner =
        user &&
        post.author?._id === user.id;

    return (
        <div className="container">

            <article className="post-details">

                <h1>
                    {post.title}
                </h1>

                <p className="post-author">
                    By {post.author?.name}
                </p>

                <p className="post-date">
                    {new Date(
                        post.createdAt
                    ).toLocaleDateString()}
                </p>

                <div className="post-content">

                    {post.content}

                </div>

                {isOwner && (

                    <div className="post-actions">

                        <button
                            onClick={() =>
                                navigate(
                                    `/edit-post/${post._id}`
                                )
                            }
                        >
                            Edit
                        </button>

                        <button
                            className="delete-button"
                            onClick={deletePost}
                        >
                            Delete
                        </button>

                    </div>

                )}

            </article>

            <section className="comments-section">

                <h2>
                    Comments
                </h2>

                <CommentForm
                    postId={id}
                    onCommentAdded={
                        handleCommentAdded
                    }
                />

                <CommentList
                    comments={comments}
                    onCommentDeleted={
                        handleCommentDeleted
                    }
                />

            </section>

        </div>
    );
}

export default PostDetails;