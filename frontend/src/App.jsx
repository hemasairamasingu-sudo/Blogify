import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar
    from "./components/Navbar";

import Home
    from "./pages/Home";

import Login
    from "./pages/Login";

import Register
    from "./pages/Register";

import CreatePost
    from "./pages/CreatePost";

import PostDetails
    from "./pages/PostDetails";

import EditPost
    from "./pages/EditPost";

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/create-post"
                    element={<CreatePost />}
                />

                <Route
                    path="/posts/:id"
                    element={<PostDetails />}
                />

                <Route
                    path="/edit-post/:id"
                    element={<EditPost />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;