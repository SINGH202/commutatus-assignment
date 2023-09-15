import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import {
  addData,
  debounce,
  getData,
  groupObjectsByTeamType,
  searchObjects,
} from "../../utils";
import { MemberCard } from "@/components/MemberCard";
import { TeamTypeEncloser } from "@/components/TeamTypeEncloser";
import { useMembersContext } from "@/context/MembersContext";
import { MemberCardProps } from "../../types";
import { membersData } from "./api/config";

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
      const res = searchObjects(membersData, query);
      const groupedByTeamType = groupObjectsByTeamType(res);
      setData(groupedByTeamType);
    }, 1000),
    []
  );

  useEffect(() => {
    try {
      if (localStorage.getItem("members_data") === null) {
        addData();
      }
      let localData = getData();

      const groupedByTeamType = groupObjectsByTeamType(membersData);

      setData(groupedByTeamType);
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
          {data?.ceo > 0 && (
            <MemberCard
              name={data?.ceo[0]?.name}
              role={data?.ceo[0]?.role}
              email={data?.ceo[0]?.email}
              phone={data?.ceo[0]?.phone}
              teamName={""}
              teamType=""
            />
          )}

          {data?.hr && <TeamTypeEncloser teamType={"HR"} teams={data?.hr} />}
          {data?.engineering && (
            <TeamTypeEncloser
              teamType={"Engineering"}
              teams={data?.engineering}
            />
          )}
          {data?.design && (
            <TeamTypeEncloser teamType={"Design"} teams={data?.design} />
          )}
        </div>
      )}
    </main>
  );
}
