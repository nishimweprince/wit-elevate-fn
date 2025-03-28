import BoldArrow from "../../assets/BoldArrow";
import { useState } from "react";
import Up from "../../assets/Up";

const datas = [
  {
    id: 0,
    fact: "Why is it better to choose WIT Elevate as a partner?",
    description:
      "Choosing WIT Elevate as a partner offers a confluence of unparalleled advantages. From their unwavering commitment to cutting-edge technology to their steadfast dedication to client success, WIT Elevate stands as a beacon of innovation and reliability. Their holistic approach, seamlessly blending expertise with an innate understanding of evolving market trends, ensures   a transformative partnership. With a track record of fostering growth and fostering long-term relationships.",
  },
  {
    id: 1,
    fact: "Why is it better to choose WIT Elevate as a partner?",
    description:
      "Choosing WIT Elevate as a partner offers a confluence of unparalleled advantages. From their unwavering commitment to cutting-edge technology to their steadfast dedication to client success, WIT Elevate stands as a beacon of innovation and reliability. Their holistic approach, seamlessly blending expertise with an innate understanding of evolving market trends, ensures   a transformative partnership. With a track record of fostering growth and fostering long-term relationships.",
  },
  {
    id: 2,
    fact: "Why is it better to choose WIT Elevate as a partner?",
    description:
      "Choosing WIT Elevate as a partner offers a confluence of unparalleled advantages. From their unwavering commitment to cutting-edge technology to their steadfast dedication to client success, WIT Elevate stands as a beacon of innovation and reliability. Their holistic approach, seamlessly blending expertise with an innate understanding of evolving market trends, ensures   a transformative partnership. With a track record of fostering growth and fostering long-term relationships.",
  },
  {
    id: 3,
    fact: "Why is it better to choose WIT Elevate as a partner?",
    description:
      "Choosing WIT Elevate as a partner offers a confluence of unparalleled advantages. From their unwavering commitment to cutting-edge technology to their steadfast dedication to client success, WIT Elevate stands as a beacon of innovation and reliability. Their holistic approach, seamlessly blending expertise with an innate understanding of evolving market trends, ensures   a transformative partnership. With a track record of fostering growth and fostering long-term relationships.",
  },
];

const Faqs = () => {
  const [isOpen, setIsOpen] = useState(-1);

  const handleClick = (id: number) => {
    setIsOpen(id === isOpen ? -1 : id);
  };
  return (
    <div className="flex flex-col gap-12">
      <h1 className="font-semibold text-3xl leading-10 text-darkGrey">FAQs</h1>
      <div className="grid lg:grid-cols-2 gap-5">
        {datas.map(({ fact, description }, index: number) => {
          return (
            <>
              <div className="bg-lightGrey p-6 rounded-sm flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-darkGrey text-base leading-6 font-medium">
                    {fact}
                  </h1>
                  <div>
                    {!isOpen ? (
                      <Up
                        onClick={() => {
                          handleClick(index);
                        }}
                      />
                    ) : (
                      <BoldArrow
                        onClick={() => {
                          handleClick(index);
                        }}
                      />
                    )}
                  </div>
                </div>
                {isOpen === index && (
                  <h1 className="text-[#878787] text-sm leading-5">
                    {description}
                  </h1>
                )}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
export default Faqs;
