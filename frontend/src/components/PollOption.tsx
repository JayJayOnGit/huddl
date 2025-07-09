import close from "/icons/close.png";

type OptionProps = {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  onRemove: (index: number) => void;
};

export default function PollOption({
  index,
  value,
  onChange,
  onRemove,
}: OptionProps) {
  return (
    <div className="flex justify-between gap-2">
      <input className="accent-brand-dark" type="checkbox" disabled></input>
      <input
        className="flex-grow p-2  border-b-1 border-neutral-300"
        type="text"
        placeholder="Option"
        value={value}
        onChange={(e) => onChange(index, e.target.value)}
      />
      <img
        className="p-2 opacity-50 hover:opacity-100 cursor cursor-pointer"
        src="/icons/close.png"
        onClick={() => onRemove(index)}
      />
    </div>
  );
}
