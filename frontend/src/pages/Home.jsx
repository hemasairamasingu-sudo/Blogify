import {
    useEffect,
    useState
} from "react";

import API from "../services/api";
import PostCard from "../components/PostCard";

function Home() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        fetchPosts();

    }, []);

    const fetchPosts = async () => {

        try {

            const response =
                await API.get("/posts");

            setPosts(response.data);

        } catch (error) {

            setError(
                "Unable to load posts"
            );

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="container">
                <h2>Loading posts...</h2>
            </div>
        );
    }

    return (
        <div className="container">

            <div className="hero">

                <h1>
                    Welcome to Blogify
                </h1>

                <p>
                    Share your ideas,
                    stories and knowledge.
                </p>

            </div>

            <h2>
                Latest Posts
            </h2>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {posts.length === 0 ? (

                <p>
                    No posts available.
                </p>

            ) : (

                <div className="posts-grid">

                    {posts.map(post => (

                        <PostCard
                            key={post._id}
                            post={post}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default Home;