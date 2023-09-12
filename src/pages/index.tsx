import Image from "next/image";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { debounce } from "../../utils";
import { MemberCard } from "@/components/MemberCard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchText, setSearchText] = useState("");

  const handleChange = (text: string) => {
    setSearchText(text);
    handleSearch(text);
  };

  const handleSearch = useCallback(
    debounce((query: string) => {
      console.log(query);
    }, 1000),
    []
  );

  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-5 ${inter.className}`}>
      <SearchBar
        searchText={searchText}
        setSearchText={(text) => handleChange(text)}
      />
      <div className="p-5 md:p-10 border border-black w-full">
        <MemberCard name={""} role={""} email={""} phone={0} />
      </div>
    </main>
  );
}
