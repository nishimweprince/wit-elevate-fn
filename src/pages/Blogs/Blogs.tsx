import { useState, useEffect } from "react";
import { allBlogs } from "../../util/api";
import profile from "../../assets/profile.png";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    allBlogs(0).then((data) => {
      setBlogs(data);
    });
  }, []);

  return (
    <div className="pt-24 grid grid-cols-3 gap-8">
      {blogs?.map(({ title, createdAt, _id, picture }) => {
        return (
          <Link to={`/blog/${_id}`}>
            <img src={picture} alt="blog" />
            <div className="flex items-center gap-3 text-purple text-xs leading-8 font-medium pt-2">
              <p>TECHNOLOGY</p>
              <p>LIFESTYLE</p>
            </div>
            <h1 className="text-lg text-darkGrey leading-8 font-mediium">
              {title}
            </h1>
            <div className="flex items-center gap-3 text-sm text-grey pt-1">
              <img src={profile} alt="profile" />
              <p className="">Clever Umuhuza</p>
              <p>.</p>
              <p>{createdAt}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
export default Blogs;
