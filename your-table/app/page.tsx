import MainContainer from "@/components/MainContainer/MainContainer";
import RestContainer from "@/components/Restaurant/RestContainer";
import SearchInput from "@/components/Search/SearchInput";

interface restaurant 
{
  id: string,
  name: string,
  photos: string,
  address: string,
  kitchen: string,
  stars: number,
}

type restaurants =
{
  restaurants: restaurant[];
}

let rest : restaurant = {
  id: Date.now().toString(),
  name: "aboba",
  photos: "/aboba.jpg",
  address: "address",
  kitchen: "russian",
  stars: 0
}

let arr = [1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

export default function Home() {

  return (
    <>
      <SearchInput></SearchInput>
      <RestContainer restData={arr}></RestContainer>
    </>
  );
}
