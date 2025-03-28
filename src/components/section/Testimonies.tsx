import Right from "../../assets/Right";
import Button from "../ui/Button";
import { testimonies } from "../../util/data";
import Testimony from "../ui/Testimony";

const Testimonies = () => {
  return (
    <div className="flex flex-col gap-12">
      <h1 className="font-medium text-3xl leading-10 text-darkGrey">
        What are <span className="text-secondary">they</span> saying
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {testimonies.map(({ testimony, name, title }) => {
          return (
            <div>
              <Testimony title={title} name={name} testimony={testimony} />
            </div>
          );
        })}
      </div>
      <div className="flex flex-col items-center">
        <Button
          icon={<Right />}
          text="Discover More"
          className="bg-lightBlue text-primary"
        />
      </div>
    </div>
  );
};
export default Testimonies;
