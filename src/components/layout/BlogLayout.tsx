import { NavLink, Outlet } from "react-router-dom";
import { blogLinks } from "../../util/data";
import Search from "../ui/Search";
import Profile from "../../assets/profile.png";
import blog1 from "../../assets/blog1.png";
const BlogLayout = () => {
  return (
    <div>
      <div className="flex flex-col items-center py-24 gap-12">
        <div className="flex flex-col items-center gap-1">
          <h1 className="font-semibold text-4xl">Our Blogs</h1>
          <p className="text-lg leading-10 text-greyy">
            Read blogs from the most influential women
          </p>
        </div>
        <Search
          placeholder="Search our blogs by topic or keywords..."
          text="Search"
        />
      </div>
      <div className="flex items-center gap-8">
        <img src={blog1} alt="blog" className="h-full" />
        <div className="flex flex-col gap-5">
          <div className="flex items center text-secondary gap-5">
            <p>Techonology</p>
            <p>Growth</p>
          </div>
          <h1 className="text-4xl text-darkGrey leading-10 font-medium">
            The Impact of Technology on the women: How Technology is changing
          </h1>
          <p className="text-greyy text-base leading-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            rhoncus nulla nunc, sed ultricies mi sodales id. Aenean sodales arcu
            quis nisi condimentum maximus ut at tortor...
          </p>
          <div className="flex items-center gap-3 text-[#9CA3AF]">
            <img src={Profile} alt="profile" />
            <p>Clever Umuhuza</p>
            <p>.</p>
            <p>10th October 2023</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-12 justify-center text-[#7C7A8B] text-base leading-7 font-medium pt-20">
        {blogLinks.map(({ link, path, end }) => {
          return (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-secondary text-white py-1 px-10 rounded-3xl"
                  : undefined
              }
              to={path}
              end={end}
            >
              {link}
            </NavLink>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
};
export default BlogLayout;
