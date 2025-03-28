import { buttonProps } from "../../util/types";
import { Loading } from "./Loading";
const Button = ({
  text,
  className,
  icon,
  onClick,
  type,
  loading,
}: buttonProps) => {
  return (
    <button
      onClick={onClick}
      className={`flex  rounded px-4 py-4 text-white- items-center gap-2 ${className}`}
      type={type || "button"}
    >
      {loading ? (
        <Loading />
      ) : (
        <h1 className={`  text-sm font-semibold leading-4 `}>{text}</h1>
      )}
      {icon}
    </button>
  );
};
export default Button;
