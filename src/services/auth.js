export const TOKEN_KEY = 'token';
export const ROLE = 'role';
export const USER = 'user';
export const USER_ID = 'user_id';
export const EMAIL = 'email';

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRole = () => localStorage.getItem(ROLE);

export const getUser = () => localStorage.getItem(USER);

export const getUserID = () => localStorage.getItem(USER_ID);

export const getEmail = () => localStorage.getItem(EMAIL);

export const login = (token, role, user, idUser, email) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE, role);
    localStorage.setItem(USER, user);
    localStorage.setItem(USER_ID, idUser);
    localStorage.setItem(EMAIL, email);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE);
    localStorage.removeItem(USER);
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(EMAIL);
};