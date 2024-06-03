import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

const Categories = () => {
  const categories = useSelector((state) => state?.category?.get?.data);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.categoryName.toLowerCase().startsWith(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  return (
    <div className="flex flex-col justify-center items-center pt-10 lg:pt-40 lg:px-72">
      <label htmlFor="searchCategory" className="flex flex-row relative">
        <input
          id="searchCategory"
          type="search"
          placeholder="Find the topics you care about..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-64 lg:w-[700px] h-12 lg:h-16 text-sm lg:text-2xl rounded-3xl border-2 border-black p-2 focus:bottom-4"
        />
        <FiSearch className="absolute right-3 top-3 lg:w-10 lg:h-10 " />
      </label>
      <div className="flex flex-row justify-center items-center content-center flex-wrap lg:pt-5">
        {filteredCategories.map((category) => (
          <button
            key={category._id}
            className="text-2xl font-semibold border-2 p-5 border-black rounded-full m-4 lg:m-5 lg:mx-20 cursor-pointer hover:bg-white"
            onClick={() => navigate(`/blog/${category?._id}`)}
          >
            {category.categoryName}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
