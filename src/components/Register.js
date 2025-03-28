import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';

const backgroundImage = "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"; // Reliable background image

const Register = () => {
    const [formData, setFormData] = useState({ username: '',email: '',phone:'', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const { username,email,phone, password, confirmPassword } = formData;

        if (!username.trim() ||!email.trim()||!phone.trim()|| !password.trim() || !confirmPassword.trim()) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', { username,email,phone,password });
            setSuccess(response.data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
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


            {/* Registration Form */}
            <Container maxWidth="xs">
                <Box sx={{ p: 4, boxShadow: 3, borderRadius: 2,backgroundColor: 'rgba(255, 255, 255, 0.9)', width: 350 }}>
                    <Typography variant="h4" gutterBottom textAlign="center">
                        Register
                    </Typography>
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="primary">{success}</Typography>}

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
                            label="email"
                            name="email"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone"
                            name="phone"
                            onChange={handleChange}
                            value={formData.phone}
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
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Confirm Password"
                            name="confirmPassword"
                            type="password"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            required
                        />

                        <Button fullWidth variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                            Register
                        </Button>
                    </form>

                    <Typography sx={{ mt: 2, textAlign: 'center' }}>
                        Already have an account?{' '}
                        <Button variant="text" onClick={() => navigate('/login')}>
                            Login
                        </Button>
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Register;
