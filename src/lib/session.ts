// Session management for protected apps
const SESSION_KEY = 'apps_session';

export const createSession = () => {
  const session = {
    authenticated: true,
    timestamp: Date.now()
  };
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const checkSession = (): boolean => {
  try {
    const session = sessionStorage.getItem(SESSION_KEY);
    if (!session) return false;
    
    const { authenticated, timestamp } = JSON.parse(session);
    // Session expires after 30 minutes
    const expired = Date.now() - timestamp > 30 * 60 * 1000;
    
    return authenticated && !expired;
  } catch {
    return false;
  }
};

export const clearSession = () => {
  sessionStorage.removeItem(SESSION_KEY);
}; 