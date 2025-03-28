import { useEffect } from "react";
import Button from "../components/ui/Button";
import { BsStars } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/ui/Loading";
import {
  generateCoursesAction,
  getUserCoursesAction,
} from "../store/courses/action";

const Generate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { user, course } = useSelector((state: any) => state);

  useEffect(() => {
    if (user?.data?.token) {
      getUserCoursesAction(user?.data?._id)(dispatch);
    }
  }, [dispatch, user?.data?.token, user?.data?._id]);

  const handleGeneratePath = async () => {
    if (!user?._id) {
      toast.error("Please login to generate learning path");
      return;
    }

    try {


      toast.success("Learning path generated successfully!");
    } catch (error: any) {
      toast.error(error || "Failed to generate learning path");
    }
  };

  const handleGenerateCourse =async () => {
    const res =await generateCoursesAction(user?.data?._id)(dispatch);
    if(res){
      navigate("/portal/courses")
    }
  };

  return (
    <>
      <div className="flex flex-col gap-14">
      
        <div className="bg-white flex flex-col items-center gap-11 px-28 py-28 rounded-3xl ml-5 mt-10">
          <h1 className="text-3xl font-semibold">First Time on Platform?</h1>
          <p className="text-sm max-w-md text-center">
            Welcome! Now that you've completed your profile, you can start your
            journey by creating your learning path.
          </p>
          <Button
            text="Generate Learning Path"
            loading={course.isLoading}
            icon={<BsStars className="w-5 h-5" />}
            className="bg-primary px-16 py-4 rounded-xl text-white flex-row-reverse"
            onClick={handleGenerateCourse}
           
          />
        </div>

      </div>
    </>
  );
};

export default Generate;
