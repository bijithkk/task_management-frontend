import { useState } from "react";
import { toast } from "react-toastify";
import { useAuthContext } from "../../shared/context/AuthContext";

import Input from "../Input";
import Button from "../Button";

export default function AuthForm({ isLogin, setIsLogin, navigate }) {
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
    if (!isLogin && formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long ❌");
      return;
    }
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
      toast.error(err || "Something went wrong");
    }
  };

  return (
    <form className="mt-10 w-80 flex flex-col gap-5" onSubmit={handleSubmit}>
      {/* Name */}
      {!isLogin && (
        <div className="flex flex-col px-6 py-3 text-left bg-[#FDFDFD] rounded-xl">
          <Input
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
        <Input
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
        <Input
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
        <Button
          type="submit"
          disabled={loading}
          className="mt-4 p-8 bg-[#F8F9FA] text-black font-semibold py-2 rounded-xl shadow-sm hover:bg-blue-700 transition"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </Button>
      </div>
      {/* error */}
      <div className="flex justify-center mt-2">
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </form>
  );
}
