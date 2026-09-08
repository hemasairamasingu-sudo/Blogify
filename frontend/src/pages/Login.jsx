import {
    useState,
    useContext
} from "react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import API from "../services/api";

import {
    AuthContext
} from "../context/AuthContext";

function Login() {

    const navigate = useNavigate();

    const { login } =
        useContext(AuthContext);

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            const response =
                await API.post(
                    "/auth/login",
                    {
                        email,
                        password
                    }
                );

            login(
                response.data.user,
                response.data.token
            );

            navigate("/");

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    };

    return (
        <div className="auth-container">

            <div className="auth-card">

                <h1>
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                >

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
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
                        Login
                    </button>

                </form>

                <p>
                    Don't have an account?
                    {" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;