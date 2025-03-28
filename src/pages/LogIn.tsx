import { useState, ChangeEvent } from "react";
import Button from "../components/ui/Button";
import Form from "../components/ui/Form";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import { formData } from "../util/types";
import { loginUserAction } from "../store/users/actions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const LogIn = () => {
  const { user } = useSelector((state: any) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<formData>({});
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await loginUserAction(formData)(dispatch);
    if (res) {
      navigate("/portal");
    }
  };

  return (
    <div className="">
      <Header link="Sign Up" path="/signUp" text="Not have an account" />
      <div className="py-44">
        <Form header="Welcome back" />
        <div className="flex flex-col items-center pt-8">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              value={formData.email}
              name="email"
              placeholder="Enter email address"
              onChange={handleChange}
            />
            <Input
              value={formData.password}
              name="password"
              placeholder="Enter password"
              onChange={handleChange}
              type="password"
            />

            <Button
              loading={user.isLoading}
              text="sign In"
              type="submit"
              className="bg-secondary text-white flex justify-center rounded-2xl"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default LogIn;
