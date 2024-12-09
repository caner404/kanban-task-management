import { ComponentProps, forwardRef } from 'react';

export type CardProps = ComponentProps<'div'> & {
  title: string;
  description: string;
  onClick?: () => void;
  dataTestid?: string;
};
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, onClick, dataTestid, ...props }, ref) => {
    return (
      <div
        {...props}
        data-testid={dataTestid}
        ref={ref}
        role="button"
        onClick={onClick}
        className={`${props.className} rounded-md py-6 px-4 drop-shadow-lg bg-white hover:text-primary`}
      >
        <div className="flex flex-col gap-2 ">
          <p className="text-md">{title}</p>
          <p className="text-sm text-neutral">{description}</p>
        </div>
      </div>
    );
  },
);
