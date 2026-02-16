import { createContext, useContext, useState, useEffect } from "react";
import { refresh as refreshApi, getUser} from "../services/authService";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function initAuth() {
      try {
        const accessToken = await refreshApi();
        setAccessToken(accessToken);
        localStorage.setItem("accessToken", accessToken);

        const res = await getUser();
        const username = res.email.split("@")[0];;
        setUser(username);
      } catch {
        setAccessToken(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
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