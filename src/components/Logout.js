import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Logout = ({ setIsOpen, isOpen }) => {
  const [isClicked, setIsClicked] = useState(false);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("Token");
    sessionStorage.removeItem("Token");
    navigate("/");
    window.location.reload();
  };

  const newBlog = () => {
    setIsOpen(!isOpen);
    navigate("/newblog");
  };

  return (
    <div>
      <div className="hidden lg:flex relative">
        <img
          onClick={() => setIsClicked(!isClicked)}
          className="rounded-full w-16 h-16 cursor-pointer hover:brightness-75"
          src={`http://localhost:9000/${user?.image}`}
          alt="user profile"
        />
        {isClicked && (
          <div
            id="logout"
            className="flex flex-col z-10 justify-center items-center gap-5 border-2 border-white w-32 h-36 absolute top-16 right-[1px] mt-2 rounded-lg bg-white"
          >
            <p
              onClick={newBlog}
              className="font-bold text-lg cursor-pointer bg-[#ebebeb] hover:text-white hover:bg-black p-2 rounded-full"
            >
              New Blog
            </p>
            <p
              onClick={logOut}
              className="font-bold text-lg cursor-pointer bg-[#ebebeb] hover:text-white hover:bg-red-900 p-2 rounded-full"
            >
              Log Out
            </p>
          </div>
        )}
      </div>
      <ul className="divide-y-2 divide-solid divide-black">
        <Link to={"/newblog"}>
          <li
            onClick={() => {
              setIsClicked(false);
              navigate("/newblog");
            }}
            className="lg:hidden cursor-pointer hover:bg-white hover:text-black font-semibold py-5 w-screen"
          >
            New Blog
          </li>
        </Link>
        <li
          onClick={() => {
            logOut();
            setIsClicked(false);
          }}
          className="lg:hidden cursor-pointer hover:bg-white hover:text-black font-semibold py-5 w-screen"
        >
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default Logout;
