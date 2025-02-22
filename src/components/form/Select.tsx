import {
  ChangeEvent,
  ComponentProps,
  forwardRef,
  PropsWithChildren,
} from 'react';

type SelectProps = ComponentProps<'select'> &
  PropsWithChildren & {
    onSelectedChange?: (selectionValue: string) => void;
  };
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, onSelectedChange, ...props }, ref) => {
    function handleChange(e: ChangeEvent) {
      const target = e.target as HTMLInputElement;
      onSelectedChange?.(target.value);
    }

    return (
      <select
        {...props}
        ref={ref}
        onChange={handleChange}
        className={`${props.className} px-4 py-2 bg-white dark:bg-neutral-dark  text-black dark:text-white text-base border rounded border-primary focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {children}
      </select>
    );
  },
);

export function SelectItem({
  children,
  ...props
}: PropsWithChildren & ComponentProps<'option'>) {
  return <option {...props}>{children}</option>;
}

export default {
  Root: Select,
  SelectItem: SelectItem,
};
