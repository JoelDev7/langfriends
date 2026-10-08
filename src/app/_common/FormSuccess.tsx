import { ReactNode } from "react";

type Props = {
  message: string | undefined;
  children: ReactNode;
};
export default function FormSuccess({ children, message }: Props) {
  return (
    <p className="text-center bg-emerald-200 rounded p-2" role="alert">
      {message}
      <br />
      {children}
    </p>
  );
}
