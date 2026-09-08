import { Link } from "react-router-dom";

function PostCard({ post }) {

    return (
        <div className="post-card">

            <h2>
                {post.title}
            </h2>

            <p className="author">
                By {post.author?.name}
            </p>

            <p>
                {post.content.length > 150
                    ? post.content.substring(0, 150) + "..."
                    : post.content
                }
            </p>

            <Link
                className="read-more"
                to={`/posts/${post._id}`}
            >
                Read More →
            </Link>

        </div>
    );
}

export default PostCard;