import { SubmitHandler, useForm } from "react-hook-form";
import { InputField } from "../_common/InputField";
import FieldError from "../_common/FieldError";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { createClient } from "@/lib/supabase/client";
import FormSuccess from "../_common/FormSuccess";
import FormError from "../_common/FormError";
import Link from "next/link";
import {
  ProfileInfo,
  profileInfoSchema,
  SignUpData,
  signUpSchema,
} from "@/lib/validation/signup";
import { zodResolver } from "@hookform/resolvers/zod";
import ShowSuggestions from "../_common/ShowSuggestions";
type Props = {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  formData: RefObject<{ email: string; password: string }>;
};
export default function ProfileInfoForm({ step, setStep, formData }: Props) {
  const [status, setStatus] = useState("");
  const countriesArray = useRef<string[]>([]);
  const languagesArray = useRef<string[]>([]);
  useEffect(() => {
    getCountriesAndLanguages().then((response) => {
      if (response.countries) {
        countriesArray.current = response.countries.map(
          (country) => country.country,
        );
      }
      if (response.languages) {
        languagesArray.current = response.languages.map(
          (language) => language.language,
        );
      }
    });
  }, []);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileInfo>({
    mode: "onTouched",
    resolver: zodResolver(profileInfoSchema),
  });
  const onSubmit: SubmitHandler<ProfileInfo> = (data) => {
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
  async function getCountriesAndLanguages() {
    const { data: countries, error: countriesError } = await supabase
      .from("countries")
      .select("country");

    if (countriesError) {
      console.error(countriesError);
    }

    const { data: languages, error: languagesError } = await supabase
      .from("languages")
      .select("language");

    if (languagesError) {
      console.error(languagesError);
    }
    return { countries, languages };
  }
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
      email: result.data.email,
      password: result.data.password,
      options: {
        data: {
          username: result.data.username,
          country: result.data.country,
          native_language: result.data.native_language,
          learning_language: result.data.learning_language,
          date_of_birth: result.data.date_of_birth,
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
        rhf={register("username")}
        fieldName="Username"
        id="username"
        type="text"
        rhfErrors={errors}
      />
      {errors.username && <FieldError message={errors.username.message} />}
      <InputField
        rhf={register("country")}
        fieldName="Country"
        id="country"
        type="text"
        rhfErrors={errors}
      />
      <ShowSuggestions
        data={countriesArray.current}
        field="country"
        query={watch("country")}
        setValue={setValue}
      />
      {errors.country && <FieldError message={errors.country.message} />}
      <InputField
        rhf={register("native_language")}
        fieldName="Native language"
        id="native_language"
        type="text"
        rhfErrors={errors}
      />
      <ShowSuggestions
        data={languagesArray.current}
        field="native_language"
        query={watch("native_language")}
        setValue={setValue}
      />
      {errors.native_language && (
        <FieldError message={errors.native_language.message} />
      )}
      <InputField
        rhf={register("learning_language")}
        fieldName="Learning language"
        id="learning_language"
        type="text"
        rhfErrors={errors}
      />
      <ShowSuggestions
        data={languagesArray.current}
        field="learning_language"
        query={watch("learning_language")}
        setValue={setValue}
      />
      {errors.learning_language && (
        <FieldError message={errors.learning_language.message} />
      )}
      <InputField
        rhf={register("date_of_birth")}
        fieldName="Date of birth"
        id="date_of_birth"
        type="text"
        rhfErrors={errors}
      />
      Format: yyyy-mm-dd <br /> Example: 2000-09-02
      {errors.date_of_birth && (
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
