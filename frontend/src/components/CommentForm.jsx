import {
    useState,
    useContext
} from "react";

import API from "../services/api";

import {
    AuthContext
} from "../context/AuthContext";

function CommentForm({
    postId,
    onCommentAdded
}) {

    const { user } =
        useContext(AuthContext);

    const [content, setContent] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!user) {
            alert("Please login to comment");
            return;
        }

        if (!content.trim()) {
            return;
        }

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await API.post(
                    `/comments/${postId}`,
                    {
                        content
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            onCommentAdded(response.data);

            setContent("");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to add comment"
            );
        }
    };

    if (!user) {

        return (
            <p>
                Login to write a comment.
            </p>
        );
    }

    return (
        <form
            className="comment-form"
            onSubmit={handleSubmit}
        >

            <textarea
                rows="4"
                placeholder="Write a comment..."
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
            />

            <button type="submit">
                Post Comment
            </button>

        </form>
    );
}

export default CommentForm;