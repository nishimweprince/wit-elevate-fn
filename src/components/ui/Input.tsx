import { inputProps } from "../../util/types";
const Input = ({
  placeholder,
  value,
  name,
  onChange,
  type,
  className,
}: inputProps) => {
  return (
    <input
      placeholder={placeholder}
      value={value}
      name={name}
      type={type}
      onChange={onChange}
      className={`bg-med p-4 rounded-2xl w-[429px] ${className}`}
    />
  );
};
export default Input;
