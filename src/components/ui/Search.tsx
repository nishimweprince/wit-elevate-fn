import { searchProps } from "../../util/types";

const Search = ({ placeholder }: searchProps) => {
  return (
    <div className="flex justify-between gap-5">
      <input
        placeholder={placeholder}
        className="bg-bright py-5 px-4 rounded-md w-[513px]"
      />
      <button className="bg-secondary text-white px-12 rounded-md">
        Search
      </button>
    </div>
  );
};
export default Search;
