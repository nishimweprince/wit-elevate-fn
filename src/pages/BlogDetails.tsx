import { useParams } from "react-router-dom";
import { useState, useEffect, ChangeEvent } from "react";
import { blog, comment, postComment, allBlogs } from "../util/api";
import profile from "../assets/profile.png";
import Calendars from "../assets/Calendars";
import { blogProps, commentProps, formData } from "../util/types";
import BookMark from "../assets/BookMark";
import Share from "../assets/Share";
import BlogCard from "../components/ui/BlogCard";
import { toast } from "react-toastify";

const BlogDetails = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const fullName = localStorage.getItem("fullName");
  const [blogDetails, setBlogDetails] = useState<blogProps>();
  const [comments, setComments] = useState([]);
  const [commentData, setCommentData] = useState<formData>({
    content: "",
    userId: userId || "",
  });
  const [blogs, setBlogs] = useState([]);

  const params = useParams();
  const id = params.id;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (e: any) => {
    e.preventDefault();
    postComment(id, commentData).then((data) => {
      if (!token) {
        toast.error("You have to login first");
      }
      setCommentData(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      comment(id).then((data: any) => {
        setComments(data);
      });
    });
    e.reset();
  };

  useEffect(() => {

    blog(id).then((data: any) => {
      setBlogDetails(data);
    });

    comment(id).then((data: any) => {
      setComments(data);
    });
  }, [id]);

  useEffect(() => {
    allBlogs(3).then((data) => {
      setBlogs(data);
    });
  }, []);

  return (
    <div className="px-40 pt-28">
      {blogDetails ? (
        <div className="">
          <h1 className="font-semibold text-4xl leading-10">
            {blogDetails.title}
          </h1>

          <p className=" text-purple text-xs leading-8 font-medium pt-2">
            TECHNOLOGY
          </p>
          <div className="flex items-center gap-1 text-sm text-grey pt-1">
            <img src={profile} alt="profile" />
            <p className="">Clever Umuhuza</p>
            <p>.</p>
            <div className="flex items-center gap-1">
              <Calendars />
              <p>10th October 2023</p>
            </div>
            <p>.</p>
            <p>8 min read</p>
          </div>
          <div className="border-t border-b flex items-center justify-end py-2 mt-4">
            <BookMark />
            <Share />
          </div>
          <div className="flex flex-col gap-10 py-9 border-b">
            <img
              src={blogDetails?.picture}
              alt=""
              className="w-[820px] object-cover h-[500px]"
            />
            <h2 className="text-base leading-8 text-dark text-justify">
              {blogDetails.description}
            </h2>
          </div>
          <div className="py-8">
            <h1 className="font-medium text-xl leading-8">
              Recommended to read
            </h1>
            <div className="flex gap-8- pt-5 pb-20">
              {blogs.map(({ title, createdAt, picture }) => {
                return (
                  <BlogCard
                    picture={picture}
                    title={title}
                    createdAt={createdAt}
                  />
                );
              })}
            </div>
          </div>
          <div className="border">
            <form
              onSubmit={handleSubmit}
              className="flex items-center px-4 py-2 justify-between "
            >
              <div className="flex items-center gap-3">
                <img src={profile} />
                <input
                  className="outline-none"
                  placeholder="Add a comment"
                  value={commentData?.content}
                  name="content"
                  onChange={handleChange}
                />
              </div>

              <button
                className="bg-lightBlue text-secondary font-semibold text-xs leading-5 px-5 rounded-md py-2"
                type="submit"
                onClick={handleSubmit}
              >
                Post comment
              </button>
            </form>
          </div>
          <div className="py-8">
            {comments?.map(({ content}: commentProps) => {
              return (
                <div>
                  <div className="flex items-center gap-2">
                    <img src={profile} alt="" />
                    <div className="flex items-center ">
                      <p className="text-xs text-dark">{fullName}</p>
                      <p className="text-[#9CA3AF] text-xs">. 1 day ago</p>
                    </div>
                  </div>
                  <div className="border-b  pb-3 mx-14">
                    <h1 className="text-sm text-dark text-justified">
                      {content}
                    </h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};
export default BlogDetails;
