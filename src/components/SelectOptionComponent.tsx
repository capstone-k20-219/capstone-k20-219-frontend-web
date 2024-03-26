import { OptionType } from "@/lib/type";

type SelectOptionComponentProps = {
  label: string;
  value?: string | number | undefined;
  name: string;
  disable?: boolean;
  autoFocus?: boolean;
  required?: boolean;
  onChangeFunction?: (value: any) => void;
  options: OptionType[];
};

export default function SelectOptionComponent({
  label,
  value,
  name,
  disable = false,
  autoFocus = false,
  required = false,
  onChangeFunction,
  options,
}: SelectOptionComponentProps) {
  return (
    <div className="w-full flex-col justify-start items-start gap-1 inline-flex text-sm">
      <label htmlFor={name} className="text-neutral-900 font-semibold">
        {label}
      </label>
      <select
        name={name}
        disabled={disable}
        value={value}
        autoFocus={autoFocus}
        required={required}
        onChange={onChangeFunction}
        className={`w-full px-1 py-1.5 rounded-md border border-neutral-300 font-normal
        focus:border-sky-600 outline-none ${
          disable ? "bg-neutral-200" : "bg-white"
        }`}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
