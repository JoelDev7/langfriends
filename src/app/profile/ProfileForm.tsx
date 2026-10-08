"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";

type Inputs = {
  username: string;
  full_name: string;
  avatar_url: string;
  age: string;
  country: string;
  native_language: string;
  learning_language: string;
  practice_schedule: string;
  mail: string;
};

type Props = { profile: Inputs };

export default function ProfileForm({ profile }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched", defaultValues: profile });
  const onSubmit: SubmitHandler<Inputs> = (data) => {};
  function insertProfile() {}
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <InputField
        fieldName="Full name"
        id="full_name"
        rhf={register("full_name", { required: "Full name is required." })}
        rhfErrors={errors}
        type="text"
      />
      {errors.full_name && <FieldError message={errors.full_name.message} />}
      <InputField
        fieldName="Username"
        id="username"
        rhf={register("username", { required: "Username is required." })}
        rhfErrors={errors}
        type="text"
      />
      {errors.username && <FieldError message={errors.username.message} />}
      <InputField
        fieldName="Age"
        id="age"
        rhf={register("age", { required: "Age is required." })}
        rhfErrors={errors}
        type="text"
      />
      {errors.age && <FieldError message={errors.age.message} />}
      <InputField
        fieldName="Country"
        id="age"
        rhf={register("country", { required: "Country is required." })}
        rhfErrors={errors}
        type="text"
      />
      {errors.country && <FieldError message={errors.country.message} />}
      <InputField
        fieldName="Native language"
        id="native_language"
        rhf={register("native_language", {
          required: "Native language is required.",
        })}
        rhfErrors={errors}
        type="text"
      />
      {errors.native_language && (
        <FieldError message={errors.native_language.message} />
      )}
      <InputField
        fieldName="Learning language"
        id="learning_language"
        rhf={register("learning_language", {
          required: "Learning language is required.",
        })}
        rhfErrors={errors}
        type="text"
      />
      {errors.learning_language && (
        <FieldError message={errors.learning_language.message} />
      )}
      <InputField
        fieldName="Practice schedule"
        id="practice_schedule"
        rhf={register("practice_schedule", {
          required: "Practice schedule is required.",
        })}
        rhfErrors={errors}
        type="text"
      />
      {errors.practice_schedule && (
        <FieldError message={errors.practice_schedule.message} />
      )}
      <InputField
        fieldName="Mail"
        id="mail"
        rhf={register("mail", { required: "Mail is required." })}
        rhfErrors={errors}
        type="text"
      />
      {errors.mail && <FieldError message={errors.mail.message} />}
    </form>
  );
}
