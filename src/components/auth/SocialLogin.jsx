export default function SocialLogin({ isLogin }) {
  return (
    <>
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
    </>
  );
}
