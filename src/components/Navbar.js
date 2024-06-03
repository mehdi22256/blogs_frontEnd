import { FiSearch } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLogged = useSelector((state) => state.user.isLogged);
  const [isSearch, setIsSearch] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const blog = useSelector((state) => state?.blog?.get?.data);
  const [Searching, setSearching] = useState("");

  return (
    <div>
      <nav className="hidden lg:flex">
        <ul className="flex flex-row justify-start items-center p-5 gap-x-20 pl-10">
          <Link to={"/"}>
            <li className="text-3xl w-max font-serif cursor-pointer">
              <span className="text-white bg-black pl-5 pt-2">Wi</span>
              Ki Blogs.
            </li>
          </Link>
          <li className="cursor-pointer text-xl hover:underline">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="cursor-pointer text-xl hover:underline">
            <Link to={"/blogs"}>Blogs</Link>
          </li>
          <li className="cursor-pointer text-xl hover:underline">
            <Link to={"/categories"}>Categories</Link>
          </li>
          <li className="cursor-pointer text-xl hover:underline">
            <Link to={"/about"}>About</Link>
          </li>
          {isLogged && (
            <li className="cursor-pointer w-max text-xl hover:underline">
              <Link to={"/newblog"}>New Blog</Link>
            </li>
          )}
          <div
            className={`flex flex-row justify-end items-center ${
              isLogged ? `pl-[500px]` : `pl-[600px]`
            } gap-x-14`}
          >
            <li className="relative bottom-3 text-3xl cursor-pointer">
              <form>
                <FiSearch
                  onClick={() => setIsSearch(!isSearch)}
                  className="absolute z-30 "
                />
                <input
                  onChange={(e) => setSearching(e.target.value)}
                  placeholder="Search..."
                  type="search"
                  id="search"
                  className={`${
                    isSearch ? `flex` : `hidden`
                  }  absolute right-[1px] bg-white w-96 h-10 rounded-lg`}
                />
              </form>
            </li>
            {isLogged ? (
              <Logout />
            ) : (
              <Link to={"/login"}>
                <li className="text-2xl font-serif border-black border-2 rounded-xl px-5 py-1 hover:bg-white cursor-pointer">
                  Login
                </li>
              </Link>
            )}
          </div>
        </ul>
      </nav>

      {/* mobile */}
      <nav>
        <div className="lg:hidden relative flex flex-row justify-between px-3 py-7 items-center h-10">
          <div>
            <FiSearch
              onClick={() => setIsSearch(!isSearch)}
              className="text-3xl cursor-pointer "
            />
          </div>
          <div>
            <RxHamburgerMenu
              onClick={() => setIsBurgerOpen(!isBurgerOpen)}
              className={`${
                isBurgerOpen
                  ? `-rotate-90 transition-all duration-500`
                  : `transition-all duration-500`
              } text-4xl cursor-pointer`}
            />
            <input
              id="searchMobile"
              type="search"
              placeholder="Search..."
              className={`${
                isSearch ? `flex` : `hidden`
              }  absolute right-[55px] bottom-[11px] bg-white w-[270px] h-8 rounded-lg p-2`}
            />
          </div>
        </div>
        {isBurgerOpen ? (
          <div
            id="navbar"
            className="fixed opacity-90 z-10 flex flex-col w-96 justify-around py-5 items-center self-end lg:hidden"
          >
            <ul
              className="flex text-center divide-y-2 divide-solid divide-black
          flex-col justify-center items-center text-2xl mb-[600px]"
            >
              <Link to={"/"}>
                <li
                  onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                  className="cursor-pointer hover:bg-white hover:text-black font-semibold py-5 w-screen"
                >
                  Home
                </li>
              </Link>
              <Link to={"/blogs"}>
                <li
                  onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                  className="cursor-pointer hover:bg-white hover:text-black font-semibold py-5 w-screen "
                >
                  Blogs
                </li>
              </Link>
              <Link to={"/categories"}>
                <li
                  onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                  className="cursor-pointer hover:bg-white hover:text-black font-semibold py-5 w-screen "
                >
                  Categories
                </li>
              </Link>
              <Link to={"/about"}>
                <li
                  onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                  className="cursor-pointer hover:bg-white hover:text-black font-semibold py-5 w-screen "
                >
                  About
                </li>
              </Link>
              {isLogged ? (
                <Logout isOpen={isBurgerOpen} setIsOpen={setIsBurgerOpen} />
              ) : (
                <Link to={"/login"}>
                  <li
                    onClick={() => setIsBurgerOpen(!isBurgerOpen)}
                    className="cursor-pointer hover:bg-white hover:text-black font-semibold py-5  w-screen "
                  >
                    Login
                  </li>
                </Link>
              )}
            </ul>
          </div>
        ) : null}
      </nav>
    </div>
  );
};

export default Navbar;
