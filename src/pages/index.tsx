import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import {
  addData,
  debounce,
  getData,
  groupObjectsByTeamType,
  searchMember,
} from "../../utils";
import { MemberCard } from "@/components/MemberCard";
import { TeamTypeEncloser } from "@/components/TeamTypeEncloser";
import { useMembersContext } from "@/context/MembersContext";
import { membersData } from "./api/config";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const { data, setData, arrangedData, setArrangedData, isLoading } =
    useMembersContext();
  const handleChange = (text: string) => {
    setSearchText(text);
    handleSearch(text);
  };

  const handleSearch = useCallback(
    debounce((query: string) => {
      const res = searchMember(membersData, query);
      const groupedByTeamType = groupObjectsByTeamType(res);
      setArrangedData(groupedByTeamType);
    }, 1000),
    []
  );

  useEffect(() => {
    try {
      if (localStorage.getItem("members_data") === null) {
        addData();
      }
      let localData = getData();
      setData(localData);
    } catch (error) {
      console.log(error);
      return;
    }
  }, []);

  useEffect(() => {
    const groupedByTeamType = groupObjectsByTeamType(data);

    setArrangedData(groupedByTeamType);
  }, [data]);

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
          {arrangedData?.ceo > 0 && (
            <MemberCard
              id={arrangedData?.ceo[0]?.id}
              name={arrangedData?.ceo[0]?.name}
              role={arrangedData?.ceo[0]?.role}
              email={arrangedData?.ceo[0]?.email}
              phone={arrangedData?.ceo[0]?.phone}
              teamName={""}
              teamType=""
            />
          )}
          <TeamTypeEncloser teamType={"HR"} teams={arrangedData?.hr} />

          <TeamTypeEncloser
            teamType={"Engineering"}
            teams={arrangedData?.engineering}
          />

          <TeamTypeEncloser teamType={"Design"} teams={arrangedData?.design} />
        </div>
      )}
    </main>
  );
}
