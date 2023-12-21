import { Box, Paper, Stack, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { PropsWithChildren } from "react";

export default function RestaurantInfo(props: PropsWithChildren) {
  return (
    <Grid2 container columnSpacing={2} rowSpacing={1}>
      <Grid2 xs={12} md={6}>
        <img src={`${props.restData.photos[0]}`}></img>
      </Grid2>
      <Grid2 xs={12} md={6}>
        <Paper>
          <Stack sx={{padding: 1}}>
            <Typography
              sx={{
                display: "flex",
                justifyItems: "center",
                justifyContent: "center",
              }}
              variant="h4"
            >
              {props.restData.title}
            </Typography>
            <Typography variant="h6" sx={{textAlign: "start"}}>
                Информация:
            </Typography>
            <Typography>
                {props.restData?.info}
            </Typography>
          </Stack>
        </Paper>
      </Grid2>
    </Grid2>
  );
}
