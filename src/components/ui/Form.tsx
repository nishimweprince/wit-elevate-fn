import { formProps } from "../../util/types";


const Form = ({ header }: formProps) => {
  return (
    <div className="">
      <div className="flex flex-col items-center gap-12">
        <h1 className="text-bold text-3xl leading-10 text-dark">{header}</h1>
        <div className="flex flex-col items-center gap-4">
          {/* <button className="flex items-center gap-4 border border-[#E7E7E7] py-2 px-24 rounded-2xl">
            <img src={Google} alt="logo" />
            <p className="font-semibold text-base leading-5">
              Continue with Google
            </p>
          </button>
          <div className="flex items-center gap-4 text-middle">
            <div className="bg-middle h-0.5 w-[180px]"></div>
            <p className="">or</p>
            <div className="bg-middle h-0.5 w-[180px]"></div>
            <div></div>
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default Form;
