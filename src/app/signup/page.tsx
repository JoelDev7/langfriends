"use client";
import { createClient } from "@/lib/supabase/client";
import { InputField } from "../common/InputField";
import { SubmitHandler, useForm } from "react-hook-form";
type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};
export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.password === data.confirmPassword) {
      signUpNewUser(data.email, data.password);
    }
  };

  const supabase = createClient();
  async function signUpNewUser(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error(error);
      return;
    }
    console.log("User:", data.user);
    console.log("Session", data.session);
    console.log("Data:", data);
  }

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col border border-primary-light   py-5 px-9 rounded-xl">
        <h1 className="text-center text-lg font-bold mt-3">Sign Up</h1>
        <form className="">
          {/* <button className="border-gray-500 py-2 cursor-pointer border rounded w-full">
            Continue with google
          </button> */}
        </form>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <InputField
            rhf={register("email", { required: "Email is required" })}
            fieldName="Email"
            id="email"
            type="text"
            rhfErrors={errors}
          />
          {errors.email?.type === "required" && (
            <p className="text-sm" role="alert">
              {errors.email.message}
            </p>
          )}
          <InputField
            rhf={register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            fieldName="Password"
            id="password"
            type="password"
            rhfErrors={errors}
          />
          {errors.password && (
            <p className="max-w-50 text-sm " role="alert">
              {errors.password.message}
            </p>
          )}
          <InputField
            rhf={register("confirmPassword", {
              required: "Password confirmation is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            fieldName="Confirm password"
            id="confirmPassword"
            type="password"
            rhfErrors={errors}
          />
          {errors.confirmPassword && (
            <p className="max-w-50 text-sm " role="alert">
              {errors.confirmPassword.message}
            </p>
          )}
          <button className="mt-4 bg-primary-light rounded py-2">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
}
