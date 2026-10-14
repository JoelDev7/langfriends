import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";
import { Dispatch, RefObject, SetStateAction, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import FormSuccess from "../_common/FormSuccess";
import FormError from "../_common/FormError";
import Link from "next/link";
import { signUpSchema } from "@/lib/validation/signup";
type Inputs = {
  username: string;
  country: string;
  native_language: string;
  learning_language: string;
  date_of_birth: string;
};
type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  formData: RefObject<{ email: string; password: string }>;
};
type SignUpData = {
  email: string;
  password: string;
  username: string;
  date_of_birth: string;
  country: string;
  native_language: string;
  learning_language: string;
};
export default function ProfileInfoForm({ step, setStep, formData }: Props) {
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signUpNewUser({
      email: formData.current.email,
      password: formData.current.password,
      username: data.username,
      country: data.country,
      native_language: data.native_language,
      learning_language: data.learning_language,
      date_of_birth: data.date_of_birth,
    });
  };
  const supabase = createClient();
  async function signUpNewUser({
    email,
    password,
    username,
    country,
    native_language,
    learning_language,
    date_of_birth,
  }: SignUpData) {
    const result = signUpSchema.safeParse({
      email,
      password,
      username,
      country,
      native_language,
      learning_language,
      date_of_birth,
    });
    if (!result.success) {
      console.log(result.error);

      return {
        error: result.error,
      };
    }
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username,
          country,
          native_language,
          learning_language,
          date_of_birth,
        },
      },
    });
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("success");
    console.log("User:", data.user);
    console.log("Session", data.session);
    console.log("Data:", data);
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${step === 2 ? "flex" : "hidden"}   flex-col max-w-50`}
    >
      <InputField
        rhf={register("username", { required: "Username is required" })}
        fieldName="Username"
        id="username"
        type="text"
        rhfErrors={errors}
      />
      {errors.username?.type === "required" && (
        <FieldError message={errors.username.message} />
      )}
      <InputField
        rhf={register("country", { required: "Country is required" })}
        fieldName="Country"
        id="country"
        type="text"
        rhfErrors={errors}
      />
      {errors.country?.type === "required" && (
        <FieldError message={errors.country.message} />
      )}
      <InputField
        rhf={register("native_language", {
          required: "Native language is required",
        })}
        fieldName="Native language"
        id="native_language"
        type="text"
        rhfErrors={errors}
      />
      {errors.native_language?.type === "required" && (
        <FieldError message={errors.native_language.message} />
      )}
      <InputField
        rhf={register("learning_language", {
          required: "Learning language is required",
        })}
        fieldName="Learning language"
        id="learning_language"
        type="text"
        rhfErrors={errors}
      />
      {errors.learning_language?.type === "required" && (
        <FieldError message={errors.learning_language.message} />
      )}
      <InputField
        rhf={register("date_of_birth", {
          required: "Date of birth is required",
        })}
        fieldName="Date of birth"
        id="date_of_birth"
        type="text"
        rhfErrors={errors}
      />
      Format: yyyy-mm-dd <br /> Example: 2000-09-02
      {errors.date_of_birth?.type === "required" && (
        <FieldError message={errors.date_of_birth.message} />
      )}
      <div className=" mt-4">
        {status === "error" ? (
          <FormError message="There was a problem, please try again later." />
        ) : null}
        {status === "success" ? (
          <FormSuccess message="">
            <Link className="text-center font-semibold" href={"/signin"}>
              Go to sign in
            </Link>
          </FormSuccess>
        ) : null}
      </div>
      <button className="mt-4 bg-primary-light border border-primary-light rounded py-2 cursor-pointer hover:bg-emerald-50">
        Sign up
      </button>
    </form>
  );
}
