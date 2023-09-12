export type SearchBarProps = {
  searchText: string;
  setSearchText: (searchText: string) => void;
};

export type MemberCardProps = {
  name: string;
  role: string;
  email: string;
  phone: number;
};
