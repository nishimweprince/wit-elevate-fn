
import profile from "../../assets/profile.png";
import { blogProps } from "../../util/types";

const BlogCard = ({ title, createdAt, picture }: blogProps) => {
  return (
    <>
      <div className="flex flex-col">
        <img src={picture} className="w-[253px]   h-[225px]" alt="blog" />
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
      </div>
    </>
  );
};
export default BlogCard;
