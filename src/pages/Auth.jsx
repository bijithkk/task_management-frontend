import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../shared/context/AuthContext";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { login, register, loading, error } = useAuthContext();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password,
        });
        toast.success("Logged in successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        navigate("/dashboard");
      } else {
        await register(formData);
        toast.success("Registered successfully!");
        setFormData((prev) => ({ ...prev, password: "" }));
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <div className="flex flex-col items-center bg-[#F8F9FACC] my-10 px-6 sm:px-12 md:px-16 py-12 sm:py-20 rounded-[55px] shadow-xl max-w-sm w-full md:max-w-xl lg:max-w-3xl">
        <h1 className="text-xl sm:text-2xl md:text-3xl text-[#1877F2] font-bold mb-3">
          {isLogin ? "Login" : "Register"}
        </h1>
        <p className="text-sm">
          {isLogin
            ? "Welcome back ! Sign in using your social"
            : "Welcome ! Sign in using your social"}
        </p>
        <p className="text-sm">account or email to continue us</p>
        <div className="flex gap-5 mt-8">
          <div className="flex items-center justify-center bg-white rounded-4xl w-10 h-10">
            <img src="/fb.png" alt="Facebook" className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-center bg-white rounded-4xl w-10 h-10">
            <img src="/google.png" alt="Facebook" className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-center bg-white rounded-4xl w-10 h-10">
            <img src="/mac.png" alt="Facebook" className="w-6 h-6" />
          </div>
        </div>

        <form
          className="mt-10 w-80 flex flex-col gap-5"
          onSubmit={handleSubmit}
        >
          {/* Name */}
          {!isLogin && (
            <div className="flex flex-col px-6 py-3 text-left bg-[#FDFDFD] rounded-xl">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border-b border-gray-400 focus:outline-none focus:border-[#1877F2] bg-transparent"
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col px-6 py-3 text-lef bg-[#FDFDFD] rounded-xl">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#1877F2] bg-transparent"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col px-6 py-3 text-lef bg-[#FDFDFD] rounded-xl">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b border-gray-400 focus:outline-none focus:border-[#1877F2] bg-transparent"
            />
          </div>
          {/* Submit */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 p-8 bg-[#F8F9FA] text-black font-semibold py-2 rounded-xl shadow-sm hover:bg-blue-700 transition"
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
            </button>
          </div>
          {/* error */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <p className="mt-6 text-sm">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="text-[#1877F2] font-medium hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
