import { useState, useEffect } from 'react';
import { getAuthData, clearAuthData, isAuthenticated } from '../utils/authHelpers';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            if (isAuthenticated()) {
                const authData = getAuthData();
                setUser({
                    id: authData.userId,
                    type: authData.userType,
                    token: authData.token
                });
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const logout = () => {
        clearAuthData();
        setUser(null);
        window.location.href = '/';
    };

    const login = (userData) => {
        setUser({
            id: userData.id || userData.userId,
            type: userData.role || userData.userType,
            token: userData.token
        });
    };

    return {
        user,
        loading,
        isAuthenticated: !!user,
        logout,
        login
    };
};