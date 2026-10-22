import { useEffect, useRef } from "react";
import FormButton from "./FormButton";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }
    if (isOpen) {
      if (!dialog.hasAttribute("open")) {
        dialog.showModal();
      }
    } else {
      if (dialog.hasAttribute("open")) {
        dialog.close();
      }
    }
  }, [isOpen]);
  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    const dialog = e.currentTarget;
    const rect = dialog.getBoundingClientRect();

    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      onClose();
    }
  }
  return (
    <dialog
      onClick={handleBackdropClick}
      ref={dialogRef}
      className="my-auto mx-auto p-5 rounded-lg "
      onClose={onClose}
    >
      <div className="flex flex-col">
        {children}
        <FormButton text="Close" click={onClose} />
      </div>
    </dialog>
  );
}
