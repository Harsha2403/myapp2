import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Typography, Box, Link, CircularProgress } from "@mui/material";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const backgroundImage = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0";

const Login = () => {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Track request status
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true); // Disable button during API call

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", formData);
            
            // Store user details in context
            login(response.data.token, response.data.user);

            navigate("/dashboard");
        } catch (err) {
            console.error("❌ Login Error:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setLoading(false); // Re-enable button
        }
    };

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* Branding at the Top Right */}
            <Box sx={{ position: "absolute", top: 20, right: 20 }}>
                <Typography variant="h6" color="white" fontWeight="bold">
                    ContractNipuna 360 AI
                </Typography>
            </Box>

            {/* Login Form */}
            <Container maxWidth="xs">
                <Box 
                    sx={{ 
                        p: 4, 
                        boxShadow: 3, 
                        borderRadius: 2, 
                        backgroundColor: "rgba(255, 255, 255, 0.9)", 
                        width: { xs: "90%", sm: 350 } // Responsive width
                    }}
                >
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Login
                    </Typography>
                    
                    {error && <Typography color="error" textAlign="center">{error}</Typography>}

                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Username"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />

                        <Button 
                            fullWidth 
                            variant="contained" 
                            color="primary" 
                            type="submit" 
                            sx={{ mt: 2 }}
                            disabled={loading} // Disable while loading
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Login"}
                        </Button>

                        {/* Forgot Password Link */}
                        <Typography sx={{ mt: 1, textAlign: "center" }}>
                            <Link href="/forgot-password" color="primary">
                                Forgot Password?
                            </Link>
                        </Typography>
                    </form>

                    <Typography sx={{ mt: 2, textAlign: "center" }}>
                        Don't have an account?{" "}
                        <Button variant="text" onClick={() => navigate("/register")}>
                            Register
                        </Button>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
