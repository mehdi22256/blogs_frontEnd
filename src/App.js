import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { fetchCategories } from "./store/categories/categorySlice";
import { fetchComments } from "./store/comments/commentSlice";
import { setCredentials } from "./store/users/userSlice";
import Categories from "./pages/Categories";
import Blog from "./pages/Blog";
import NewBlog from "./pages/NewBlog";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import { fetchBlogs } from "./store/blogs/blogSlice";
import DetailedPage from "./pages/DetailedPage";
import About from "./pages/About";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCredentials());
    dispatch(fetchBlogs());
    dispatch(fetchCategories());
    dispatch(fetchComments());
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:_id" element={<DetailedPage />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/newblog" element={<NewBlog />} />
      </Routes>
    </div>
  );
}

export default App;
