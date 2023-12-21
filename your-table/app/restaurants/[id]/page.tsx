import RestaurantInfo from "@/components/Restaurant/RestaurantInfo";
import { Box, Button, Container, Paper } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Slot, Zone } from "@prisma/client";

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
        </Grid2>
        <Grid2 xs={12} container columnSpacing={2} rowSpacing={1} sx={{marginTop:2}}>
          {restData.zones.map((zone : Zone)=> {
            return (
            <Paper key={zone.id}>
              {zone.discription}
              {zone.slots.map((slot : Slot) => {return <Button key={slot.id}>{slot.discription}</Button>})}
              </Paper>
            )
          })}
          </Grid2>
  
    </Container>
  );
}
