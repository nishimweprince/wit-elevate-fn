import { Link } from "react-router-dom";
import { headerProps } from "../../util/types";

const Header = ({ link, text, path }: headerProps) => {
  return (
    <div className="flex items-center justify-between px-32 py-10">
      <Link to="/" className="text-black text-2xl leading-10 font-extrabold">
        WIT <span className="text-secondary">Elevate</span>
      </Link>
      <p className="text-grey font-medium text-base">
        {text}?{" "}
        <Link to={path} className="text-secondary">
          {link}
        </Link>
      </p>
    </div>
  );
};
export default Header;
