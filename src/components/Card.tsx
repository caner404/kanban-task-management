import { ComponentProps, forwardRef } from 'react';

export type CardProps = ComponentProps<'div'> & {
  title: string;
  description: string;
  onClick?: () => void;
};
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, onClick }, ref) => {
    return (
      <div
        ref={ref}
        role="button"
        onClick={onClick}
        className={'rounded-md py-6 px-4 drop-shadow-lg bg-white'}
      >
        <div className="flex flex-col gap-2 hover:cursor-pointer">
          <p className="text-md">{title}</p>
          <p className="text-sm text-neutral">{description}</p>
        </div>
      </div>
    );
  },
);
