import RestaurantInfo from "@/components/Restaurant/RestaurantInfo";
import RestaurantZonesAndSlots from "@/components/Restaurant/RestaurantZonesAndSlots";
import { Box, Button, Container, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

async function getRestaurantInfoById(restId: any) {
  const res = await fetch(`http://localhost:3000/api/restaurants/${restId}`, {cache: "no-cache"});
  return res.json();
}

export default async function Restaurant(props: any) {
  const restData = await getRestaurantInfoById(props.params.id);
  return (
    <Container className="my-5 shadow-md">
        <Grid2 container spacing={2} rowSpacing={2} columnSpacing={2}>
          <RestaurantInfo restData={restData} />
          <hr />
          <Grid2 xs={12} container columnSpacing={2} rowSpacing={1} sx={{
            marginTop:2,
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
          }} >
            <RestaurantZonesAndSlots zonesAndSlots={restData} xs={12}></RestaurantZonesAndSlots>
          </Grid2>
        </Grid2>
    </Container>
  );
}
