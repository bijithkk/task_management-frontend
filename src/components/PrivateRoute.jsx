import { Navigate } from "react-router-dom";
import { useAuthContext } from "../shared/context/AuthContext";

export default function PrivateRoute({ children }) {
  const { token, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>; // optional: show spinner while checking auth
  if (!token) return <Navigate to="/login" />;

  return children;
}