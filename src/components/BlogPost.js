import { useNavigate } from "react-router-dom";
const BlogPost = ({
  title,
  date,
  timeOfReading,
  introduction,
  image,
  fullName,
  _id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row m-auto mt-5 justify-center items-center lg:h-96 lg:w-[800px]">
      <div className="lg:w-[400px] lg:h-72 lg:pl-5">
        <img
          onClick={() => navigate(`/${_id}`)}
          className="lg:h-64 lg:w-72 lg:m-5 cursor-pointer"
          src={`http://localhost:9000/${image}`}
          alt="user"
        />
      </div>
      <div className="flex flex-col lg:w-[400px] lg:gap-y-5">
        {/* <p className="text-slate-400">TECHNOLOGY</p> */}
        <p
          onClick={() => navigate(`/${_id}`)}
          className="font-bold font-serif text-xl pt-2 lg:pt-0 hover:underline cursor-pointer line-clamp-2"
        >
          {title}
        </p>
        <div className="hidden lg:flex flex-row">
          <p className="text-slate-400">{fullName}</p>
          <p className="text-slate-400">.</p>
          <p className="text-slate-400">{date}</p>
          <p className="text-slate-400">{`(${timeOfReading})`}</p>
        </div>
        <p className="hidden lg:flex">{introduction}</p>
      </div>
    </div>
  );
};

export default BlogPost;
