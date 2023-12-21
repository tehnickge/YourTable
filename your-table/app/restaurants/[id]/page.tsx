import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Image from "next/image";

async function getRestaurantInfoById(id: any) {
  const res = await fetch(`http://localhost:3000/api/restaurants/${id}`);
  const [restData, resInfo] = await res.json();
  return restData;
}

export default async function Restaurant(props: any) {
  const restData = await getRestaurantInfoById(props.params.id);
  return (
    <Container className="my-5 shadow-md">
      <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
          <Grid2 xs={12} md={4}>
            <img src={restData?.photos[0]}/>
          </Grid2>
          <Grid2 xs={4}>xs=4</Grid2>
          <Grid2 xs={4}>xs=4</Grid2>
          <Grid2 xs={8}>xs=8</Grid2>
        </Grid2>
      </Box>
    </Container>
  );
}
