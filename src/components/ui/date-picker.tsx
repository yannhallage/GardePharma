import * as React from 'react';
import { Popover } from './popover';
import { Button } from './button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

export function DatePicker({ value, onChange, placeholder = 'Choisir une date', disabled }: {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Button
        variant="outline"
        className={`w-full justify-start text-left font-normal ${!value ? 'text-gray-400' : ''}`}
        onClick={() => setOpen(!open)}
        disabled={disabled}
        type="button"
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {value ? format(value, 'dd/MM/yyyy') : placeholder}
      </Button>
      <div className="z-50">
        <DayPicker
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          className="bg-white rounded-lg shadow p-2 mt-2"
        />
      </div>
    </Popover>
  );
} 