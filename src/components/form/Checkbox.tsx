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
    const [isChecked, setisChecked] = useState(props.checked);

    function handleChange(e: ChangeEvent) {
      const target = e.target as HTMLInputElement;
      setisChecked(target.checked);
      onCheckedChange?.(target.checked);
    }

    function handleClick() {
      setisChecked(!isChecked);
      onCheckedChange?.(!isChecked);
    }

    return (
      <div
        className="relative flex gap-4 bg-neutral-light  hover:bg-primary/25 dark:bg-neutral-darker dark:hover:bg-primary/25 rounded p-3 hover:cursor-pointer"
        onClick={handleClick}
      >
        <input
          {...props}
          checked={isChecked}
          type="checkbox"
          ref={ref}
          onChange={handleChange}
          className="dark:accent-primary"
        />
        <Label
          className={`relative text-sm z-10 ${isChecked ? 'text-black/50 dark:text-neutral line-through' : 'text-black dark:text-neutral'}`}
          htmlFor={props.id}
        >
          {children}
        </Label>
      </div>
    );
  },
);
