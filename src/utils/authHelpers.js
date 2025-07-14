// Authentication helper functions
export const AUTH_STORAGE_KEYS = {
    TOKEN: 'userToken',
    USER_TYPE: 'userType',
    USER_ID: 'userId'
};

export const setAuthData = (data) => {
    if (data.token) {
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, data.token);
    }
    if (data.role || data.userType) {
        localStorage.setItem(AUTH_STORAGE_KEYS.USER_TYPE, data.role || data.userType);
    }
    if (data.id || data.userId) {
        localStorage.setItem(AUTH_STORAGE_KEYS.USER_ID, data.id || data.userId);
    }
};

export const getAuthData = () => {
    return {
        token: localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN),
        userType: localStorage.getItem(AUTH_STORAGE_KEYS.USER_TYPE),
        userId: localStorage.getItem(AUTH_STORAGE_KEYS.USER_ID)
    };
};

export const clearAuthData = () => {
    localStorage.removeItem(AUTH_STORAGE_KEYS.TOKEN);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER_TYPE);
    localStorage.removeItem(AUTH_STORAGE_KEYS.USER_ID);
};

export const isAuthenticated = () => {
    const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
    return !!token;
};

export const getUserType = () => {
    return localStorage.getItem(AUTH_STORAGE_KEYS.USER_TYPE);
};

// API helper functions
export const createApiRequest = (url, options = {}) => {
    const token = localStorage.getItem(AUTH_STORAGE_KEYS.TOKEN);
    
    return {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        }
    };
};

export const handleApiResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    
    let data;
    if (contentType && contentType.includes('application/json')) {
        data = await response.json();
    } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}`);
    }
    
    if (!response.ok) {
        throw new Error(data.message || data.error || `Request failed: ${response.status}`);
    }
    
    return data;
};

// Validation helpers
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
};

export const getPasswordStrength = (password) => {
    let strength = 0;
    const checks = [
        /.{8,}/, // At least 8 characters
        /[a-z]/, // Lowercase letter
        /[A-Z]/, // Uppercase letter
        /\d/,    // Number
        /[!@#$%^&*(),.?":{}|<>]/ // Special character
    ];
    
    checks.forEach(check => {
        if (check.test(password)) strength++;
    });
    
    if (strength < 2) return { level: 'weak', color: 'red' };
    if (strength < 4) return { level: 'medium', color: 'yellow' };
    return { level: 'strong', color: 'green' };
};