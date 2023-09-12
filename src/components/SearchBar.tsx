import { SearchBarProps } from "../../types";

export const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between items-center p-5 md:p-10 w-full">
      <span className="text-2xl sm:text-3xl font-semibold font-serif">
        Employees Management System
      </span>
      <input
        placeholder="Search by email, name and phone"
        type="text"
        value={searchText}
        onChange={(e) => {
          e.preventDefault();
          setSearchText(e.target.value);
        }}
        className="border rounded-lg px-3 py-2 focus:outline-none w-full md:max-w-md"
      />
    </div>
  );
};
