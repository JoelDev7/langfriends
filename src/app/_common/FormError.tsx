type Props = {
  message: string | undefined;
};
export default function FormError({ message }: Props) {
  return (
    <p className="text-center bg-red-200 rounded p-2" role="alert">
      {message}
    </p>
  );
}
