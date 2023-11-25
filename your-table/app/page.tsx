import MainContainer from "@/components/MianContainer/MainContainer";
import RestContainer from "@/components/Restuarant/RestContainer";
import SearchInput from "@/components/Search/SearchInput";



let restaurant: {id: Date, name: string, photo: string, address: string, kitchen: string}

let arr = [1,2,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]

export default function Home() {

  return (
    <>
      <SearchInput></SearchInput>
      <RestContainer restData={arr}></RestContainer>
    </>
  );
}
