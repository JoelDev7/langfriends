type Props = {
  message: string | undefined;
};
export default function FormWarning({ message }: Props) {
  return (
    <p className="text-center bg-orange-200 rounded p-2" role="alert">
      {message}
    </p>
  );
}
