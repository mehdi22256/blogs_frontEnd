import { useState } from "react";
import { fetchCreate } from "../store/blogs/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const NewBlog = () => {
  const [title, setTitle] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [timeOfReading, setTimeOfReading] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector((state) => state?.category?.get?.data);
  const token =
    localStorage.getItem("Token") || sessionStorage.getItem("Token");
  const createBlog = (e) => {
    e.preventDefault();
    const post = {
      title,
      content,
      introduction,
      timeOfReading,
      image,
      category,
    };
    dispatch(fetchCreate({ post, token }));
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center lg:items-start lg:p-7 lg:pl-40 font-serif">
      <p className="text-4xl font-bold mb-5 w-max">New Blog</p>
      <form
        onSubmit={createBlog}
        className="flex flex-col justify-center items-center gap-5 font-serif"
      >
        <textarea
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-80 h-10 lg:w-[1250px] resize-none p-1 align-text bg-[#c4c4c4] rounded-md placeholder:text-slate-500 pl-2 "
        />
        <textarea
          required
          rows={4}
          onChange={(e) => setIntroduction(e.target.value)}
          placeholder="Description"
          className="w-80 lg:w-[1250px] resize-none p-1 bg-[#c4c4c4] rounded-md placeholder:text-slate-500 pl-2"
        />
        <input
          required
          onChange={(e) => setTimeOfReading(e.target.value)}
          placeholder='Time of reading "By minutes"'
          className="w-80 self-start resize-none p-1 lg:w-56 bg-[#c4c4c4] rounded-md placeholder:text-slate-500 ml-9 pl-2"
        />
        <textarea
          required
          rows={15}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-80 lg:w-[1250px] resize-none p-1 bg-[#c4c4c4] rounded-md placeholder:text-slate-500 pl-2"
        />
        <label htmlFor="categories" className="flex flex-row">
          <p>select the category: </p>
          <select
            name="categories"
            id="categories"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category._id}>
                {category.categoryName}
              </option>
            ))}
          </select>
        </label>
        <label
          htmlFor="image"
          className="text-sm lg:font-semibold w-max flex flex-row items-center"
        >
          Select an image:
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            accept="image/*"
            id="image"
          />
        </label>
        <button
          type="submit"
          className="m-auto my-5 lg:my-9 text-2xl font-serif border-black border-2 rounded-xl px-32 lg:px-40 py-2 hover:bg-white cursor-pointer"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default NewBlog;
