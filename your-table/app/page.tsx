import MainContainer from "@/components/MainContainer/MainContainer";
import RestContainer from "@/components/Restaurant/RestContainer";
import SearchInput from "@/components/Search/SearchInput";

async function getData() {
  const res = await fetch("http://localhost:3000/api/restaurants",
    {
      next: {
        revalidate : 10
      }
    }
  );
  const resData = await res.json();
  return resData;
}

export default async function Home() {
  const restData = await getData();
  return (
        <MainContainer>
        <SearchInput />
          <RestContainer restData={restData} />
        </MainContainer>
  );
}
