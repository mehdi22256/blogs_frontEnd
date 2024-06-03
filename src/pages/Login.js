import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/users/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signInUser, setSignInUser] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRememberMe, setIsRememberMe] = useState(false);
  const isLogged = useSelector((state) => state.user.isLogged);

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  const signIn = (e) => {
    setIsLoading(true);
    e.preventDefault();
    let userInfo = {
      username: signInUser,
      password: signInPassword,
    };
    dispatch(loginUser({ userInfo, isRemember: isRememberMe })).finally(() => {
      setIsLoading(false);
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div>
        <form
          onSubmit={signIn}
          className="flex flex-col gap-y-5 items-center pt-32"
        >
          <p className="font-semibold font-serif text-4xl lg:text-5xl">
            Welcome Back!
          </p>
          <p className="lg:text-xl">
            Sign in to get the most out of Wiki News.
          </p>
          <input
            onChange={(e) => setSignInUser(e.target.value)}
            required
            placeholder="Username"
            type="text"
            className="w-80 lg:w-96 h-10 rounded-md pl-2 bg-[#f8f8f8]"
          />
          <input
            onChange={(e) => setSignInPassword(e.target.value)}
            required
            placeholder="Password"
            type="password"
            className="w-80 lg:w-96 h-10 rounded-md pl-2 bg-[#f8f8f8]"
          />
          <div className="flex flex-row gap-x-28 lg:gap-x-44">
            <div className="flex items-center gap-x-1 cursor-pointer">
              <input
                onClick={() => setIsRememberMe(!isRememberMe)}
                className="w-5 h-5 cursor-pointer"
                type="checkbox"
                id="checkbox"
              />
              <label
                htmlFor="checkbox"
                className="text-[#777777] cursor-pointer hover:underline"
              >
                Remember me
              </label>
            </div>
            <p
              onClick={() => navigate("/signup")}
              className="text-[#777777] cursor-pointer hover:underline"
            >
              New User?
            </p>
          </div>
          <button
            type="submit"
            className="text-2xl font-serif border-black border-2 rounded-xl px-32 lg:px-40 py-2 hover:bg-white cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
