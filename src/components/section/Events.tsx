import { useState, useEffect } from "react";
import { allEvents } from "../../util/api";
import { eventProps } from "../../util/types";
import { Link } from "react-router-dom";
import Right from "../../assets/Right";
import Button from "../ui/Button";

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    allEvents(4).then((data) => {
      setEvents(data);
    });
  }, []);

  return (
    <div className="flex flex-col gap-12 mt-4">
      <h2 className="font-semibold text-3xl leading-10 max-w-xl">
        Choose from the recent and Our Featured Events
      </h2>
      <div className="grid md:grid-cols-2 gap-5 md:w-[1200px] ">
        {events?.map(({ title, _id, picture }: eventProps) => {
          return (
            <>
              <div className="relative">
                <div>
                  <img src={picture} className="w-[585px]- w-full h-[354px] object-cover v" />
                </div>
                <div className="absolute bottom-8 left-5 text-white leading-8">
                  <h1 className="font-bold text-2xl ">{title}</h1>
                  <Link to={`event/${_id}`} className="text-lg underline">
                    {" "}
                    Learn more
                  </Link>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <Link to="events" className="flex flex-col items-center">
        <Button
          icon={<Right />}
          text="View More Events"
          className="bg-lightBlue text-primary"
        />
      </Link>
    </div>
  );
};
export default Events;
