import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";
import { Dispatch, RefObject, SetStateAction } from "react";
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
  formData: RefObject<{}>;
};
export default function ProfileInfoForm({ step, setStep, formData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(formData.current);
    console.log(data);
  };
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
      Format: dd/mm/yyyy <br /> Example: 02/09/2000
      {errors.date_of_birth?.type === "required" && (
        <FieldError message={errors.date_of_birth.message} />
      )}
      <button className="mt-4 bg-primary-light border border-primary-light rounded py-2 cursor-pointer hover:bg-emerald-50">
        Sign up
      </button>
    </form>
  );
}
