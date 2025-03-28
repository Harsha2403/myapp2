import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const checkToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedUser = jwtDecode(token);

                // ✅ Check if token is expired
                if (decodedUser.exp * 1000 < Date.now()) {
                    console.warn('🔴 Token expired, logging out...');
                    logout();
                } else {
                    setUser(decodedUser);
                }
            } catch (error) {
                console.error('❌ Invalid token:', error);
                logout();
            }
        }
    };

    useEffect(() => {
        checkToken();

        // ✅ Listen for token changes in localStorage (for multi-tab sync)
        const handleStorageChange = () => {
            checkToken();
        };
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        checkToken();
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
