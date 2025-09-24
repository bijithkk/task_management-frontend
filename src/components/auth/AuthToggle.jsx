import Button from "../Button";

export default function AuthToggle({ isLogin, setIsLogin }) {
  return (
    <p className="mt-6 text-sm">
      {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
      <Button
        type="button"
        onClick={() => setIsLogin(!isLogin)}
        className="text-[#1877F2] font-medium hover:underline bg-transparent shadow-none px-0 py-0"
      >
        {isLogin ? "Register" : "Login"}
      </Button>
    </p>
  );
}
