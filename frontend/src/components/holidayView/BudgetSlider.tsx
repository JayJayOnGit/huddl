type BudgetSliderProps = {
  isActive: boolean | undefined;
  value: number;
  increment: number;
  maxIncMultiple: number;
  onSlide: (value: number) => void;
};

export default function BudgetSlider({
  isActive,
  value,
  increment,
  maxIncMultiple,
  onSlide,
}: BudgetSliderProps) {
  return (
    <div
      className={
        "p-4 border-1 border-neutral-300 rounded-sm shadow-xs" +
        (isActive && " hidden")
      }
    >
      <label className="flex flex-wrap gap-4 justify-between items-center">
        <h3 className="text-nowrap">Select Your Budget</h3>
        <div className="flex gap-4 grow">
          <input
            className="slider grow min-w-64"
            type="range"
            min="1"
            max={maxIncMultiple}
            value={value}
            onChange={(e) => onSlide(e.target.valueAsNumber)}
          />
          <h3>
            £{value * increment}
            {value >= maxIncMultiple && "+"}
          </h3>
        </div>
      </label>
    </div>
  );
}
