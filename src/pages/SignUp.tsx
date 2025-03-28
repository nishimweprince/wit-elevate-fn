

import Form from "../components/ui/Form";
import Button from "../components/ui/Button";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import { formData } from "../util/types";
import { ChangeEvent, useState } from "react";
import { signUp } from "../util/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<formData>({
    fullName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!data.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!data.password.trim()) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); 
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    signUp(data)
      .then(() => {
        toast.success("Signed up successfully");
        navigate("/logIn");
      })
      .catch((err) => {
        toast.error("Signup failed. Try again!");
      });
  };

  return (
    <div>
      <Header link="Log In" path="/login" text="Already have an account?" />
      <div className="py-44">
        <Form header="Welcome back" />
        <div className="flex flex-col items-center pt-8">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Input
                value={data.fullName}
                name="fullName"
                placeholder="Enter Full Name"
                onChange={handleChange}
              />
              {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
            </div>

            <div>
              <Input
                value={data.email}
                name="email"
                placeholder="Enter Email Address"
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <Input
                type="password"
                value={data.password}
                name="password"
                placeholder="Enter Password"
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <Button
              type="submit"
              text="Sign Up"
              className="bg-secondary text-white flex justify-center rounded-2xl"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
