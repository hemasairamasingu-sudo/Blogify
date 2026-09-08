import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useContext
} from "react";

import {
    AuthContext
} from "../context/AuthContext";

function Navbar() {

    const {
        user,
        logout
    } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="logo">
                <Link to="/">
                    BLOGIFY
                </Link>
            </div>

            <div className="nav-links">

                <Link to="/">
                    Home
                </Link>

                {user ? (
                    <>
                        <Link to="/create-post">
                            Create Post
                        </Link>

                        <span className="welcome">
                            Hi, {user.name}
                        </span>

                        <button
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;