import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchBlog } from "../store/blogs/blogSlice";
import { useEffect } from "react";
import CategoryBlogs from "../components/CategoryBlogs";
const Blog = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state?.blog?.getBlogs?.data?.blog);
  console.log("🚀 ~ Blog ~ blog:", blog);

  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchBlog(id));
  }, []);

  if (!blog || blog.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {blog?.map((blog, index) => (
        <CategoryBlogs
          fullName={blog?.user?.fullName}
          _id={blog?._id}
          key={index}
          image={blog?.image}
          title={blog?.title}
          date={blog?.date}
          timeOfReading={blog?.timeOfReading}
          introduction={blog?.introduction}
        />
      ))}
    </div>
  );
};

export default Blog;
