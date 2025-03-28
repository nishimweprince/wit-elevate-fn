import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { event } from "../util/api";
import { PiCalendarBlank } from "react-icons/pi";
import { GoClock } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import { FaAngleRight } from "react-icons/fa";
import { eventProps } from "../util/types";
const EventDetails = () => {
  const [eventDetails, setEventDetails] = useState<eventProps>();
  const params = useParams();
  useEffect(() => {
    event(params.id).then((data) => {
      setEventDetails(data);
    });
  }, [params.id]);

  return (
    <div>
      <h1 className="font-semibold text-4xl text-center mt-32">
        {eventDetails?.title}
      </h1>
      <p className="text-base text-dark t mt-6 line-clamp-1 mx-52 ">
        {eventDetails?.description}
      </p>
      <div className="flex items-center gap-8 ml-[650px] mt-[75px] ">
        <button className="bg-secondary text-white px-10 py-3 rounded-full text-base  ">
          Apply Now
        </button>
        <button className="border border-secondary bg-white text-secondary  px-10 py-3 rounded-full">
          Share
        </button>
      </div>
      <div className="items-cente ml-[665px] mt-2">
        <span className="text-xs text-slate-400">No credit card required</span>
      </div>
      <div className="ml-[400px] mt-10">
        <img src={eventDetails?.picture} className="w-[790px] h-[450px]" />
        <h1 className="mt-2 text-[18px] font-semibold">
          {eventDetails?.title}
        </h1>
        <div className="flex">
          <p>45 slots remains</p>
          <p className="ml-2 -mt-1">.</p>
          <p className="ml-2">Hosted by WIT Elevate</p>
        </div>
      </div>
      <div className="bg-[#F4F1F1] w-[790px] h-0.5 ml-[400px] mt-8"></div>
      <div>
        <div className="flex ml-[400px] mt-8 text-[#B3B2B2]">
          <PiCalendarBlank className="w-6 h-6" />
          <p className="text-[14px] ml-3">{eventDetails?.date}</p>
        </div>
        <div className="flex ml-[400px] mt-6 text-[#B3B2B2]">
          <GoClock className="w-6 h-6" />
          <p className="text-[14px] ml-3">{eventDetails?.time}</p>
        </div>
        <div className="flex ml-[400px] mt-6 text-[#B3B2B2]">
          <SlLocationPin className="w-6 h-6" />
          <p className="text-[14px] ml-3">{eventDetails?.location}</p>
        </div>
      </div>
      <div className="bg-[#F4F1F1] w-[790px] h-0.5 ml-[400px] mt-8"></div>
      <div className="ml-[400px] mt-6">
        <p>
          {eventDetails?.description} <br></br>
          <span className="text-[#8B8A8A]">
            The journey of women in tech dates back to the 19th century with Ada
            Lovelace, renowned as the world's first computer programmer. Her
            visionary work alongside Charles Babbage laid the foundation for
            modern computing, demonstrating an early grasp of the potential of
            machines beyond mere calculation. <br></br>
          </span>
          <span className="text-[#B4B1B1]">
            Despite remarkable progress, women in tech continue to face systemic
            challenges. The gender gap persists, with women being
            underrepresented in leadership positions and facing biases in hiring
            and promotion. Moreover, hostile work environments and gender-based
            discrimination hinder many talented women from reaching their full
            potential.
          </span>
          <br></br>
          <span className="text-[#D7D4D4]">
            the weekends; he missed the formal structure of the business week.
            When he was younger he used to stay late
          </span>
        </p>
        <div className="flex">
          <button className="border-b border-black bg-transparent hover:bg-gray-100   transition duration-300 ease-in-out font-bold">
            Show more
          </button>
          <FaAngleRight className="mt-[6px] text-[#8B8A8A] " />
        </div>
      </div>
      <div className="bg-[#F4F1F1] w-[790px] h-0.5 ml-[400px] mt-16"></div>
      <div className="ml-[400px] mt-11">
        <h1 className="font-semibold  text-[18px]">Events speakers</h1>
        <p>Listen. Learn. Get inspired from our special speakers. </p>
      </div>
      <div className="flex justify-start ml-[400px] mt-11">
        <div className="flex items-center gap-3 ">
        
          <div>
            <h1 className="font-semibold  text-[18px]">
              {eventDetails?.organiser}
            </h1>
            <p>
              Listen. Learn. Get inspired from our <br></br> special speakers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EventDetails;
