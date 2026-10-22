import { useEffect, useRef } from "react";

type Props = {
  showPopover: boolean;
  onClose: () => void;
  message: string;
  type: "success" | "error" | "info" | "";
  durationMils: number;
};
export default function Popover({
  message,
  type,
  durationMils,
  showPopover,
  onClose,
}: Props) {
  const popoverRef = useRef<HTMLDivElement | null>(null);
  let timeout: NodeJS.Timeout;
  useEffect(() => {
    const popover = popoverRef.current;
    if (showPopover) {
      popover?.showPopover();
      timeout = setTimeout(() => {
        if (popover?.matches(":popover-open")) {
          popover.hidePopover();
          onClose();
        }
      }, durationMils);
    }
    // return
  }, [showPopover]);
  return (
    <div
      ref={popoverRef}
      popover="manual"
      role="status"
      className={`${type === "success" ? "bg-emerald-200" : type === "error" ? "bg-red-200" : type === "info" ? "bg-blue-200" : ""} popover-anim p-5 rounded-lg mx-auto mt-10 transition `}
    >
      {message}
    </div>
  );
}
