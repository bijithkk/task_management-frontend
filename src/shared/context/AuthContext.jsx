import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "../hooks";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { login, register, loading, error } = useAuth();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("ngtoken") || null);

  // optional: restore user from localStorage on mount
  useEffect(() => {
    if (token) {
      setUser({}); // you can fetch user profile here if needed
    }
  }, [token]);

  const handleLogin = async (data) => {
    const res = await login(data);
    setToken(res.data.accessToken);
    localStorage.setItem("ngtoken", res.data.accessToken);
    setUser(res.data.user);
  };

  const handleRegister = async (data) => {
    await register(data);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ngtoken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login: handleLogin,
        register: handleRegister,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
