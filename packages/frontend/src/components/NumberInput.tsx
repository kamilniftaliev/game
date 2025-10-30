import { type ChangeEvent, useCallback } from "react";

interface Props {
  value: number;
  step: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  label?: string;
}

export function NumberInput({
  value,
  step,
  onChange,
  min = step,
  max,
  label,
}: Props) {
  const applyNewValue = useCallback(
    (value: number) => {
      const precision = `${min}`.split(".")[1]?.length || 0;

      const newValue = parseFloat(value.toFixed(precision));

      if (newValue < min || (typeof max === "number" && newValue > max)) return;

      onChange(newValue);
    },
    [min, max, onChange]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = +e.target.value;

      applyNewValue(value);
    },
    [applyNewValue]
  );

  return (
    <div className="flex items-center justify-between gap-8 bg-green-100 rounded-full py-2 pl-4 pr-3">
      {label && (
        <span className="text-green-900 font-bold shrink-0">{label}</span>
      )}
      <div className="flex items-center gap-2">
        <button
          className="rounded-full bg-green-900 text-white font-bold h-6 aspect-square cursor-pointer"
          type="button"
          onClick={() => applyNewValue(value - step)}
        >
          -
        </button>
        <input
          name="input"
          className="focus:outline-none text-center flex-1 font-bold w-14"
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={handleChange}
        />
        <button
          className="rounded-full bg-green-900 text-white font-bold h-6 aspect-square cursor-pointer"
          type="button"
          onClick={() => applyNewValue(value + step)}
        >
          +
        </button>
      </div>
    </div>
  );
}
