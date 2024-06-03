import { useNavigate } from "react-router-dom";
const CategoryBlogs = ({
  fullName,
  title,
  date,
  timeOfReading,
  introduction,
  image,
  _id,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col lg:flex-row m-auto p-5 lg:p-0 my-5 justify-center items-center lg:h-96 lg:w-[800px]">
      <div
        onClick={() => navigate(`/${_id}`)}
        className="lg:w-[400px] lg:h-72 lg:pl-5"
      >
        <img
          className="lg:h-64 lg:w-72 lg:m-5 cursor-pointer"
          src={`http://localhost:9000/${image}`}
          alt="user"
        />
      </div>
      <div className="flex flex-col lg:px-10 lg:w-[400px] gap-y-5">
        <p
          onClick={() => navigate(`/${_id}`)}
          className="font-bold text-center lg:text-left font-serif text-lg lg:text-xl hover:underline cursor-pointer line-clamp-2"
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

export default CategoryBlogs;
