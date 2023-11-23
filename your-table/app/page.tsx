import MainContainer from "@/components/MianContainer/MainContainer";
import RestContainer from "@/components/Restuarant/RestContainer";
import SearchInput from "@/components/search/SearchInput";

export default function Home() {

  return (
    <MainContainer>
      <SearchInput></SearchInput>
      <RestContainer></RestContainer>
    </MainContainer>
  );
}
