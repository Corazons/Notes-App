import { createContext, useContext, useState, useEffect } from "react";
import { refresh as refreshApi, getUser} from "../services/authService";
import { getUsername } from "../util/getUsername";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function initAuth() {
      try {
        const accessToken = await refreshApi();
        localStorage.setItem("accessToken", accessToken);
        console.log("accessToken : ", accessToken);
        setAccessToken(accessToken);

        const res = await getUser();
        console.log("User : ", res);
        const username = getUsername(res);
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