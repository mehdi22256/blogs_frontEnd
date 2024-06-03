import { useSelector } from "react-redux";
import BlogPost from "../components/BlogPost";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  const blog = useSelector((state) => state?.blog?.get.data);

  if (!blog || blog.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-5 px-10">
      <div className="relative flex items-center justify-center">
        <img
          onClick={() => navigate(`/${blog[0]._id}`)}
          className="lg:w-[1500px] lg:h-[600px] cursor-pointer"
          loading="lazy"
          src={`http://localhost:9000/${blog[0]?.image}`}
          alt="user"
        />
        <div className="absolute opacity-90 flex flex-col gap-2 lg:gap-5 p-1 lg:p-5 top-0 right-24 lg:left-32 bg-white w-[200px] lg:w-[500px] h-[140px] lg:h-[350px]">
          {/* <p className="text-slate-400 text-2xl pt-2 bg-white">TECHNOLOGY</p> */}
          <p
            onClick={() => navigate(`/${blog[0]._id}`)}
            className="font-bold font-serif text-xs lg:text-3xl bg-white hover:underline cursor-pointer line-clamp-3"
          >
            {blog[0]?.title}
          </p>
          <div className="hidden lg:flex flex-row gap-x-3 bg-white">
            <p className="bg-white text-slate-400">{blog[0]?.user?.fullName}</p>
            <p className="bg-white text-slate-400">.</p>
            <p className="bg-white text-slate-400">{blog[0]?.date}</p>
            <p className="bg-white text-slate-400">{`(${blog[0]?.timeOfReading})`}</p>
          </div>
          <p className="bg-white text-xs lg:text-xl line-clamp-3">
            {blog[0]?.introduction}
          </p>
        </div>
      </div>
      <div>
        <p className="text-center font-bold text-2xl lg:text-4xl font-serif pt-10 underline decoration-4">
          Recently Published
        </p>
        {blog.slice(1).map((post, index) => (
          <BlogPost
            _id={post._id}
            image={post.image}
            fullName={post.user.fullName}
            key={index}
            title={post.title}
            date={post.date}
            timeOfReading={post.timeOfReading}
            introduction={post.introduction}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
