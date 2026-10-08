type Props = {
  message: string | undefined;
};
export default function FieldError({ message }: Props) {
  return (
    <p className=" text-sm bg-red-200 rounded p-2" role="alert">
      {message}
    </p>
  );
}
