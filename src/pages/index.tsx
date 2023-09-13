import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { addData, debounce, getData } from "../../utils";
import { MemberCard } from "@/components/MemberCard";
import { TeamTypeEncloser } from "@/components/TeamTypeEncloser";
import { useMembersContext } from "@/context/MembersContext";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const { data, setData, isLoading } = useMembersContext();
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

  useEffect(() => {
    try {
      if (localStorage.getItem("members_data") === null) {
        addData();
      }
      let localData = getData();
      console.timeLog(localData);
      setData(localData);
    } catch (error) {
      console.log(error);
      return;
    }
  }, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center gap-5 ${inter.className}`}>
      <SearchBar
        searchText={searchText}
        setSearchText={(text) => handleChange(text)}
      />
      {isLoading ? (
        "Loading..."
      ) : (
        <div className="p-5 md:p-10 w-full">
          <MemberCard
            name={data?.ceo.name}
            role={data?.ceo?.role}
            email={data?.ceo?.email}
            phone={data?.ceo?.phone}
            teamName={""}
          />

          <TeamTypeEncloser teamType={"HR"} teams={data?.hr} />
          <TeamTypeEncloser
            teamType={"Engineering"}
            teams={data?.engineering}
          />
          <TeamTypeEncloser teamType={"Design"} teams={data?.design} />
        </div>
      )}
    </main>
  );
}
