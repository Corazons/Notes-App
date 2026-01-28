import { createContext, useContext, useState, useEffect } from "react";
import { refresh as refreshApi} from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    async function initAuth() {
      try {
        const accessToken = await refreshApi()
        setAccessToken(accessToken);
      } catch {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    }

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        loading,       
        setLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}