import { ComponentProps, forwardRef, PropsWithChildren } from 'react';

type SelectProps = ComponentProps<'select'> & PropsWithChildren;
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ children, ...props }, ref) => {
    return (
      <select
        {...props}
        ref={ref}
        className={`${props.className} px-4 py-2 bg-white  text-black text-base border rounded border-primary appearance-none`}
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
  return (
    <option {...props} className="">
      {children}
    </option>
  );
}

export default {
  Root: Select,
  SelectItem: SelectItem,
};
