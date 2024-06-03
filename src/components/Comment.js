import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSendComments } from "../store/comments/commentSlice";
const Comment = ({ _id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const comments = useSelector((state) => state?.comment?.get?.data);
  const isLogged = useSelector((state) => state.user.isLogged);

  const findComment = comments?.filter((comment) => comment?.blog === _id);
  const token =
    localStorage.getItem("Token") || sessionStorage.getItem("Token");
  const sendComment = () => {
    const post = {
      comment: comment,
      blog: _id,
    };
    dispatch(fetchSendComments({ post, token }));
  };

  return (
    <div className="flex flex-col border-2 border-black pt-1 rounded-lg mt-5">
      <p className="p-5 lg:p-3 lg:text-2xl underline">Comments:</p>
      <div className="flex flex-col pl-5 lg:p-5">
        {findComment?.map((comment) => (
          <div className="flex flex-row gap-x-5">
            <p>{comment?.user?.fullName} :</p>
            <p>{comment?.comment}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row p-5 lg:p-0 gap-5 lg:m-5 rounded-lg">
        {isLogged ? (
          <form className="flex flex-row gap-1" onSubmit={sendComment}>
            <input
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a Comment"
              type="text"
              className="pl-2 h-10 w-64 lg:w-[600px] rounded-lg border-2 border-black"
            />
            <button
              type="submit"
              className="w-12 lg:w-20 h-10 rounded-lg border-2 border-black bg-lime-950 text-white hover:bg-lime-800"
            >
              Send
            </button>
          </form>
        ) : (
          <p
            onClick={() => navigate("/login")}
            className="font-semibold hover:underline cursor-pointer"
          >
            Please Login to Comment
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;
