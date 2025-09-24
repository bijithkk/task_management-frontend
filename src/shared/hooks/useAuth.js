import { useState } from "react";
import { registerUser, loginUser } from "../api/auth";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await registerUser(data);
      return res;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data) => {
    try {
      setLoading(true);
      setError(null);
      const res = await loginUser(data);
      localStorage.setItem("ngtoken", res.token);
      return res;
    } catch (err) {
      const message = err.message.includes("-")
      ? err.message.split("-")[1].trim()
      : err.message;
      setError(message);
      console.log("error:-",message)
      throw message;
    } finally {
      setLoading(false);
    }
  };

  return { register, login, loading, error };
}
