"use client";
import Popover from "@/app/_common/Popover";
import React, { createContext, useState, useCallback } from "react";

export type PopoverType = "success" | "error" | "info" | "";

type PopoverState = {
  show: boolean;
  message: string;
  type: PopoverType;
  durationMils: number;
};

export type PopoverContextType = {
  triggerPopover: (
    message: string,
    type?: PopoverType,
    durationMils?: number,
  ) => void;
  closePopover: () => void;
};

export const PopoverContext = createContext<PopoverContextType | undefined>(
  undefined,
);

const INITIAL_STATE: PopoverState = {
  show: false,
  message: "",
  type: "",
  durationMils: 0,
};

export function PopoverProvider({ children }: { children: React.ReactNode }) {
  const [popover, setPopover] = useState<PopoverState>(INITIAL_STATE);

  const closePopover = useCallback(() => {
    setPopover(INITIAL_STATE);
  }, []);

  const triggerPopover = useCallback(
    (
      message: string,
      type: PopoverType = "info",
      durationMils: number = 3000,
    ) => {
      setPopover({
        show: true,
        message,
        type,
        durationMils,
      });
    },
    [],
  );

  return (
    <PopoverContext.Provider value={{ triggerPopover, closePopover }}>
      {children}
      <Popover
        onClose={closePopover}
        durationMils={popover.durationMils}
        message={popover.message}
        showPopover={popover.show}
        type={popover.type}
      />
    </PopoverContext.Provider>
  );
}
