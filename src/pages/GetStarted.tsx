import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const GetStarted = () => {
  return (
    <>
    <div className="px-5 py-10">
 
      <Link
            to="/"
            className="text-black text-2xl leading-10 font-extrabold "
          >
            WIT <span className="text-primary">Elevate</span>
          </Link>
    </div>
      <div className=" flex flex-col justify-center- items-center py-[200px] gap-[55px]">
        <h1 className="text-2xl font-semibold">Complete your profile to start using WIT</h1>
        <Button
          text="Get started"
          className="bg-secondary- bg-[#4E44F4] text-white flex justify-center- rounded-xl px-28  py-4" 
        />
      </div>
    </>
  );
};
export default GetStarted;
