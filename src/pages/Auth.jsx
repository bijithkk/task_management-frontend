import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SocialLogin from "../components/auth/SocialLogin";
import AuthForm from "../components/auth/AuthForm";
import AuthToggle from "../components/auth/AuthToggle";

export default function Auth() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const token = localStorage.getItem("ngtoken");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url(/bg.png)" }}
    >
      <div className="flex flex-col items-center bg-[#F8F9FACC] my-10 px-6 sm:px-12 md:px-16 py-12 sm:py-20 rounded-[55px] shadow-xl max-w-sm w-full md:max-w-xl lg:max-w-3xl">
        <SocialLogin isLogin={isLogin} />
        <AuthForm
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          navigate={navigate}
        />
        <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />
      </div>
    </div>
  );
}
