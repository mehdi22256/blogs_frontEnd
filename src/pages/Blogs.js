import { useSelector } from "react-redux";
import BlogPost from "../components/Blogs";

const Blogs = () => {
  const blog = useSelector((state) => state?.blog?.get?.data);

  if (!blog || blog.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex lg:flex-row flex-wrap p-5 gap-10">
      {blog.map((blog, index) => (
        <BlogPost
          _id={blog._id}
          image={blog.image}
          fullName={blog.user.fullName}
          key={index}
          title={blog.title}
          date={blog.date}
          timeOfReading={blog.timeOfReading}
          introduction={blog.introduction}
        />
      ))}
    </div>
  );
};

export default Blogs;
