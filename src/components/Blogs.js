import { useNavigate } from "react-router-dom";
const BlogPost = ({
  _id,
  title,
  date,
  timeOfReading,
  introduction,
  fullName,
  image,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row m-auto lg:mt-5 lg:gap-10 justify-center items-center lg:h-80 lg:w-[700px]">
      <div onClick={() => navigate(`/${_id}`)} className="lg:w-6/12">
        <img
          className="cursor-pointer"
          src={`http://localhost:9000/${image}`}
          alt="user"
        />
      </div>
      <div className="flex flex-col gap-y-1 lg:w-6/12">
        {/* <p className="text-slate-400">TECHNOLOGY</p> */}
        <p
          onClick={() => navigate(`/${_id}`)}
          className="font-bold font-serif text-lg lg:text-md hover:underline cursor-pointer line-clamp-2"
        >
          {title}
        </p>
        <div className="hidden lg:flex flex-row gap-x-1 w-max">
          <p className="text-slate-400 text-sm">{fullName}</p>
          <p className="text-slate-400 text-sm">.</p>
          <p className="text-slate-400 text-sm">{date}</p>
          <p className="text-slate-400 text-sm">{`(${timeOfReading})`}</p>
        </div>
        <p className="hidden lg:flex text-sm line-clamp-3">{introduction}</p>
      </div>
    </div>
  );
};

export default BlogPost;
