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
      <article
        {...props}
        data-testid={dataTestid}
        ref={ref}
        onClick={onClick}
        className={`rounded-md py-6 px-4 drop-shadow-lg bg-white dark:bg-neutral-dark hover:text-primary flex flex-col gap-2 focus-within:cursor-grab focus:outline-none focus:ring-2 focus:ring-blue-500 ${props.className}`}
      >
        <header className="text-md dark:text-white">{title}</header>
        <p className="text-sm text-neutral ">{description}</p>
      </article>
    );
  },
);
