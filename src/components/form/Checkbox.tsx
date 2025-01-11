import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  PropsWithChildren,
  useState,
} from 'react';
import { Label } from './Label';

type InputProps = ComponentProps<'input'> &
  PropsWithChildren & {
    onCheckedChange?: (isChecked: boolean) => void;
  };
export const Checkbox = forwardRef<HTMLInputElement, InputProps>(
  ({ children, onCheckedChange, ...props }, ref) => {
    const [completed, setCompleted] = useState(props.checked);

    function handleChange(e: ChangeEvent) {
      const target = e.target as HTMLInputElement;
      setCompleted(target.checked);
      onCheckedChange?.(target.checked);
    }

    return (
      <div className="flex gap-4 bg-neutral-light dark:bg-neutral-darker rounded p-3">
        <input
          {...props}
          checked={completed}
          type="checkbox"
          ref={ref}
          onChange={handleChange}
          className="dark:accent-primary"
        />
        <Label
          className={`text-sm ${completed ? 'text-black/50 dark:text-neutral line-through' : 'text-black dark:text-neutral'}`}
          htmlFor={props.id}
        >
          {children}
        </Label>
      </div>
    );
  },
);
