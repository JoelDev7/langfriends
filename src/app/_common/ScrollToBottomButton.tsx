import { MouseEventHandler } from "react";

type Props = {
  click: MouseEventHandler<HTMLButtonElement>;
};
export default function ScrollToBottomButton({ click }: Props) {
  return (
    <button
      onClick={click}
      className="bg-primary-light rounded-full size-12 absolute bottom-20 right-10"
    >
      Down
    </button>
  );
}
