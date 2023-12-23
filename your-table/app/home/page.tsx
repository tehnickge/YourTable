"use client";
import MainContainer from "@/components/MainContainer/MainContainer";
import {
  Avatar,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Rent } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState();
  const session = useSession();
  const [sessionStatus, setSessionStatus] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `http://localhost:3000/api/users/getInfoWithHistory?id=${session.data?.user?.id}`
    )
      .then((res) => {
        console.log(res);
        return res?.json();
      })
      .then((data) => {
        setUserData(data);
        setIsLoading(false);
      });
  }, [session]);

  if (isLoading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress
          color="secondary"
          sx={{ minWidth: 200, minHeight: 200 }}
        />
      </Container>
    );
  }
  return (
    <MainContainer>
      <Grid2 container columnSpacing={1}>
        <Grid2 xs={4}>
          <Avatar
            src={userData?.user?.photo}
            sx={{ minWidth: 250, minHeight: 250 }}
          ></Avatar>
        </Grid2>
        <Grid2
          xs={8}
          sx={{ display: "flex", justifyItems: "center", alignItems: "center" }}
        >
          <Typography variant="h3">Имя: {userData?.user?.name}</Typography>
          <Link href={`http://localhost:3000/api/auth/signout`} className=" text-red-700 hover:text-lg hover:text-orange-200">
            <ExitToAppIcon />
          </Link>
        </Grid2>
        <Grid2 xs={12} sx={{ marginTop: 2 }}>
          <hr></hr>
        </Grid2>
        <Grid2
          xs={12}
          sx={{
            display: "flex",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3">История</Typography>
        </Grid2>
        <Grid2 xs={12}>
          <Stack spacing={2}>
            {userData?.user?.Rent.map((rent: Rent) => {
              return (
                <Paper key={rent.id} sx={{ padding: 1 }}>
                  <Grid2 container columnSpacing={1} rowSpacing={1}>
                    <Grid2
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography>Номер заказа: {rent.id}</Typography>
                    </Grid2>
                    <Grid2 xs={12}>
                      <Link href={`/restaurants/${rent.restaurant.id}`}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyItems: "center",
                            justifyContent: "center",
                          }}
                          variant="h5"
                        >
                          {rent.restaurant.title}
                        </Typography>
                      </Link>
                    </Grid2>
                    <Stack
                      direction="row"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      <Typography>время начала: {rent.timeStart}</Typography>
                      <Typography>время конца: {rent.timeEnd}</Typography>
                      <Typography>время создания: {rent.createdAt}</Typography>
                    </Stack>
                    <Grid2 xs={12}>
                      <Typography>статус: {rent.rentStatus.title}</Typography>
                    </Grid2>
                    <Stack>
                      {rent?.slots.map((slot: slot) => {
                        return (
                          <Typography key={slot.id}>
                            столик: {slot.slot.discription} на{" "}
                            {slot.slot.amountPeople} персоны
                          </Typography>
                        );
                      })}
                    </Stack>
                  </Grid2>
                </Paper>
              );
            })}
          </Stack>
        </Grid2>
      </Grid2>
    </MainContainer>
  );
}
