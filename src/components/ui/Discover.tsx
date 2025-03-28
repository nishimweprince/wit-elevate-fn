import { discoverProps } from "../../util/types";
import Plus from "../../assets/Plus";

const Discover = ({ text }: discoverProps) => {
  return (
    <div className="flex items-center bg-[#EFEFF2] px-8 py-2 gap-4 rounded-3xl">
      <button className="font-semibold text-base leading-4 ">{text}</button>
      <Plus />
    </div>
  );
};
export default Discover;
