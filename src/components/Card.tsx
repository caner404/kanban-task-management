export function Card({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-md py-6 px-4 drop-shadow-lg">
      <div className="flex flex-col gap-2">
        <p className="text-md">{title}</p>
        <p className="text-sm text-neutral">{description}</p>
      </div>
    </div>
  );
}
