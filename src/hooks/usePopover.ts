import { useContext } from 'react';
import { PopoverContext } from '../contexts/PopoverContext';

export function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}