import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../store/users/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.data);
  const isLogged = useSelector((state) => state.user.isLogged);
  const [isLoading, setIsLoading] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newImage, setNewImage] = useState("");

  const signUp = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const userInfo = {
      username: newUsername,
      password: newPassword,
      email: newEmail,
      fullName: newFullName,
      image: newImage,
    };
    dispatch(signUpUser(userInfo));
    setIsLoading(false);
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/");
    }
  }, [isLogged, navigate]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <div className="flex flex-col gap-y-5 items-center justify-center pt-16 lg:pt-24">
        <p className="font-semibold font-serif text-5xl lg:text-7xl">Sign Up</p>
        <p className="lg:text-2xl">Enter the following information</p>
        <form onSubmit={signUp} className="flex flex-col items-center gap-y-5">
          <input
            required
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Username"
            type="text"
            className="w-80 lg:w-96 h-10 rounded-md pl-2 bg-[#f8f8f8]"
          />
          <input
            required
            onChange={(e) => setNewFullName(e.target.value)}
            placeholder="Full Name"
            type="text"
            className="w-80 lg:w-96 h-10 rounded-md pl-2 bg-[#f8f8f8]"
          />
          <input
            required
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="Email"
            type="email"
            className="w-80 lg:w-96 h-10 rounded-md pl-2 bg-[#f8f8f8]"
          />
          <input
            required
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-80 lg:w-96 h-10 rounded-md pl-2 bg-[#f8f8f8]"
          />

          <label htmlFor="image" className="text-sm font-semibold">
            Select an image:
            <input
              onChange={(e) => setNewImage(e.target.files[0])}
              type="file"
              id="image"
            />
          </label>

          <button
            type="submit"
            className="text-2xl font-serif border-black border-2 rounded-xl px-28 lg:px-36 py-2 hover:bg-white cursor-pointer"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
