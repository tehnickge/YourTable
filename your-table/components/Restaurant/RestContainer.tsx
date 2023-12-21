"use client";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useSearchInput } from "../store/StoreSearch";
import RestCard from "./RestCard";

export default function RestContainer(props: any) {
  const searchInput = useSearchInput((state: any) => state.searchInput);
  const setSearchInput = useSearchInput((state: any) => state.setSearchInput);
  const filterStars = useSearchInput((state: any) => state.filterStars);
  const setFilterStars = useSearchInput((state: any) => state.setFilterStars);
  const filterKitchens = useSearchInput((state: any) => state.filterKitchens);
  const addFilterKitchens = useSearchInput(
    (state: any) => state.addFilterKitchens
  );
  const deleteFilterKitchens = useSearchInput(
    (state: any) => state.deleteFilterKitchens
  );

  const filterByKitchen = (item: any) => {
    return (
      filterKitchens.length === 0 ||
      filterKitchens.filter((kitchen: any) =>
      {
       return (item.kitchens.map((ki: any) => ki.type === kitchen).includes(true))
      }
      ).length !== 0
    );
  };

  const restDataFilter = props.restData.filter(filterByKitchen).filter((item: any)=> {return item.title.includes(searchInput)});

  return (
    <Grid2 container spacing={2} sx={{ flexGrow: 1 }}>
      {restDataFilter.map((data: any) => {
        return (
        <Grid2 key={data.resId} xs={12} md={4} sx={{ display: "flex", justifyItems: "center",justifyContent: "center"}}>
          <RestCard resData={data} />
        </Grid2>
        );
      })}
    </Grid2>
  );
}
