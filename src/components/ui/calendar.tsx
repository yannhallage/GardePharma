import * as React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";

export interface CalendarProps {
  mode?: "single" | "multiple" | "range";
  selected?: Date | undefined;
  onSelect?: (date: Date | undefined) => void;
  disabled?: boolean;
  className?: string;
  open?: boolean; // facultatif, pour contrôler l'animation
}

export function Calendar({
  mode = "single",
  selected,
  onSelect,
  disabled,
  className = "",
  open = true, // par défaut toujours visible
}: CalendarProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
        >
          <DayPicker
            mode={mode}
            selected={selected}
            onSelect={onSelect}
            disabled={disabled}
            className={className}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
} 