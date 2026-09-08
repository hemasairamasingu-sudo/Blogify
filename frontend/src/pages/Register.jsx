import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleRegister = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            const response = await API.post("/auth/register", {
                name: name,
                email: email,
                password: password
            });

            console.log("Registration Response:", response.data);

            alert("Registration successful!");

            navigate("/login");

        } catch (error) {

            console.log("Registration Error:", error);

            if (error.response) {

                setError(
                    error.response.data.message ||
                    "Registration failed"
                );

            } else if (error.request) {

                setError(
                    "Backend server is not running"
                );

            } else {

                setError(
                    "Something went wrong"
                );
            }

        } finally {

            setLoading(false);

        }
    };


    return (
        <div className="auth-container">

            <form
                className="auth-form"
                onSubmit={handleRegister}
            >

                <h1>Create Account</h1>

                <label>Name</label>

                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />


                <label>Email</label>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />


                <label>Password</label>

                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>


                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </form>

        </div>
    );
}

export default Register;