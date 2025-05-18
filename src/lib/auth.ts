import { sha256 } from 'js-sha256';
import { getCookie, setCookie } from 'cookies-next';

declare global {
    interface Window {
        ENV?: {
            APPS_PASS?: string;
        }
    }
}

const getValidPasswordHash = () => {
    // In browser, use the injected ENV variable
    if (typeof window !== 'undefined' && window.ENV?.APPS_PASS) {
        return sha256(window.ENV.APPS_PASS);
    }
    // During SSR or if ENV is not yet available, return empty string
    return '';
};

export const isAuthenticated = () => {
    if (typeof window === 'undefined' || !window.ENV?.APPS_PASS) {
        return false;
    }
    const authToken = getCookie('auth_token');
    return authToken === getValidPasswordHash();
};

export const authenticate = (password: string): boolean => {
    if (typeof window === 'undefined' || !window.ENV?.APPS_PASS) {
        return false;
    }
    const hashedPassword = sha256(password);
    const validHash = getValidPasswordHash();
    
    if (hashedPassword === validHash) {
        setCookie('auth_token', hashedPassword, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            secure: true,
            sameSite: 'strict'
        });
        return true;
    }
    return false;
};

export const logout = () => {
    setCookie('auth_token', '', { maxAge: -1 });
}; 