import rectangle22 from "../../assets/Rectangle 22.png";
import rectangle25 from "../../assets/Rectangle 25.png";
import rectangle13 from "../../assets/Rectangle 13.png";
import rectangle21 from "../../assets/Rectangle 21.png";
import rectangle23 from "../../assets/Rectangle 23.png";
import rectangle24 from "../../assets/Rectangle 24.png";
import rectangle26 from "../../assets/Rectangle 26.png";

const Stand = () => {
  return (
    <div className="flex flex-col  py-28 items-center  gap-14">
      <div className="flex flex-col gap-6 ">
        <h2 className="font-semibold text-3xl text-center leading-10 max-w-3xl">
          We stand with all courageous women in tech who are influencing the
          change.{" "}
        </h2>
        <p className="text-base leading-8 text-center max-w-4xl">
          WIT Elevate is here to foster your career growth. we focus on
          providing the information, sharing new knowledge, and offering events
          that are happining in Kigali
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex gap-8 ">
          <input
            placeholder="name@email.com"
            className="bg-bright lg:py-5 lg:px-4 rounded-md lg:w-[513px]"
          />
          <button className="bg-secondary text-white px-12 rounded-md">
            Subscribe
          </button>
        </div>
        <p className="text-grey text-xs">
          We send all the updates to our subscribers, you can be the part of our
          regulars.{" "}
        </p>
      </div>
      <div className="md:flex flex-col gap-5 hidden">
        <div className="flex items-center gap-56 justify-center">
          <img src={rectangle22} alt="image" />
          <img src={rectangle25} alt="image" />
        </div>
        <div className="md:flex gap-5 hidden ">
          <img src={rectangle13} alt="image" className="h-[215px]" />
          <img src={rectangle21} alt="image" />
          <img src={rectangle23} alt="image" className="h-[215px]" />
          <img src={rectangle24} alt="image" />
          <img src={rectangle26} alt="image" className="h-[215px]" />
        </div>
      </div>
    </div>
  );
};
export default Stand;
