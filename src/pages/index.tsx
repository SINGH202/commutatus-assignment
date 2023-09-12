import Image from "next/image";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { debounce } from "../../utils";
import { MemberCard } from "@/components/MemberCard";
import { config } from "./api/config";
import { TeamTypeEncloser } from "@/components/TeamTypeEncloser";

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
      <div className="p-5 md:p-10 w-full">
        <MemberCard
          name={config?.ceo.name}
          role={config?.ceo?.role}
          email={config?.ceo?.email}
          phone={config?.ceo?.phone}
          teamName={""}
        />

        <TeamTypeEncloser teamType={"HR"} teams={config?.hr} />
        <TeamTypeEncloser teamType={"Engineer"} teams={config?.engineering} />
        <TeamTypeEncloser teamType={"Design"} teams={config?.design} />
      </div>
    </main>
  );
}
