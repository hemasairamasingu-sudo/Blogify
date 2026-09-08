const API = axios.create({
    baseURL: "https://your-backend-url.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});