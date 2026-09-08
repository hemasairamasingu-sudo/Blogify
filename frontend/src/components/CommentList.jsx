import {
    useContext
} from "react";

import API from "../services/api";

import {
    AuthContext
} from "../context/AuthContext";

function CommentList({
    comments,
    onCommentDeleted
}) {

    const { user } =
        useContext(AuthContext);

    const deleteComment =
        async (commentId) => {

        try {

            const token =
                localStorage.getItem("token");

            await API.delete(
                `/comments/${commentId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            onCommentDeleted(commentId);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Unable to delete comment"
            );
        }
    };

    if (comments.length === 0) {

        return (
            <p>
                No comments yet.
            </p>
        );
    }

    return (
        <div className="comments">

            {comments.map(comment => (

                <div
                    className="comment"
                    key={comment._id}
                >

                    <div>

                        <strong>
                            {comment.user?.name}
                        </strong>

                        <p>
                            {comment.content}
                        </p>

                    </div>

                    {user &&
                        comment.user?._id === user.id && (

                        <button
                            className="delete-button"
                            onClick={() =>
                                deleteComment(
                                    comment._id
                                )
                            }
                        >
                            Delete
                        </button>

                    )}

                </div>

            ))}

        </div>
    );
}

export default CommentList;