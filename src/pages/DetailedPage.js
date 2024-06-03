import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDetails } from "../store/blogs/blogSlice";
import Comment from "../components/Comment";
const DetailedPage = () => {
  const dispatch = useDispatch();
  const { _id } = useParams();
  const blog = useSelector((state) => state?.blog?.details?.data);

  useEffect(() => {
    dispatch(fetchDetails(_id));
  }, []);

  return (
    <div className="py-5 px-5 lg:px-32">
      <div className="relative flex items-center justify-center">
        <img
          className="lg:w-[900px] w-screen"
          loading="lazy"
          src={`http://localhost:9000/${blog?.image}`}
          alt="user"
        />
      </div>
      <div className="flex flex-col justify-center items-center pt-5 lg:pt-20 lg:px-10">
        <p className="font-bold font-serif text-2xl lg:text-5xl leading-relaxed text-center">
          {blog?.title}
        </p>
        <div className="flex flex-row w-max gap-x-2 lg:gap-x-3 pt-5">
          <p className="text-slate-400 text-sm lg:text-xl">
            {blog?.user?.fullName}
          </p>
          <p className="text-slate-400 text-sm lg:text-xl">.</p>
          <p className="text-slate-400 text-sm lg:text-xl">{blog?.date}</p>
          <p className="text-slate-400 text-sm lg:text-xl">{`(${blog?.timeOfReading})`}</p>
        </div>
        <p className="text-xl pt-5 lg:pt-10 leading-loose font-serif">
          {blog?.content}
        </p>
      </div>
      <Comment _id={_id} />
    </div>
  );
};

export default DetailedPage;
