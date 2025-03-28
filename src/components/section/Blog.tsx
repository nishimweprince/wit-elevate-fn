import { useState, useEffect } from "react";
import { allBlogs } from "../../util/api";
import { blogProps } from "../../util/types";
import { Link } from "react-router-dom";
import Right from "../../assets/Right";
import Button from "../ui/Button";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    allBlogs(2).then((data) => {
      setBlogs(data);
    });
  }, []);

  return (
    <div className="py-40">
      <h1 className="text-3xl font-semibold leading-10 text-darkGrey">
        Read Blogs from our women <br></br> contributors
      </h1>
      <div className="grid grid-cols-2 px-16 gap-12 bg-white  pt-28 ">
        {blogs?.map(({ title, _id, picture, description }: blogProps) => {
          return (
            <div className="flex gap-8">
              <img
                src={picture}
                alt="blg"
                className="w-[239px] h-full object-cover rounded-md brightness-75"
              />
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4 text-xs">
                  <p className="text-primary">Category</p>
                  <p className="text-light">5 min read</p>
                </div>
                <div className="gap-2 flex flex-col">
                  <h1 className="text-2xl text-darkGrey leading-8">{title}</h1>
                  <p className="text-base text-light leading-6 line-clamp-1">
                    {description}
                  </p>
                </div>

                <div>
                  <Link
                    className="text-light underline text-sm leading-6 pt-1"
                    to={`blog/${_id}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Link to="blogs" className="flex flex-col items-center pt-12">
        <Button
          icon={<Right />}
          text="Explore More Articles"
          className="bg-lightBlue text-primary"
        />
      </Link>
    </div>
  );
};
export default Blog;
