export function Card({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick?: () => void; // onClick optional hinzufügen
}) {
  return (
    <div
      role="button"
      onClick={onClick}
      className="bg-white rounded-md py-6 px-4 drop-shadow-lg"
    >
      <div className="flex flex-col gap-2 hover:cursor-pointer">
        <p className="text-md">{title}</p>
        <p className="text-sm text-neutral">{description}</p>
      </div>
    </div>
  );
}
