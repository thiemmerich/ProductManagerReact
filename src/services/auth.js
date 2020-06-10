export const TOKEN_KEY = "token";
export const ROLE = "role";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRole = () => localStorage.getItem(ROLE);

export const login = (token, role) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE, role);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE);
};