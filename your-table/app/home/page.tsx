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
  createTheme,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Rent } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import moment from "moment";
import { Nabla, Raleway } from "next/font/google";

export const nabla = Nabla({
  weight: "variable",
  preload: true,
  subsets: ["latin"],
  axes: ["EDPT", "EHLT"],
});

export const raleway = Raleway({
  weight: "300",
  subsets: [],
});

const theme = createTheme({
  typography: {
    fontFamily: [nabla.style.fontFamily, raleway.style.fontFamily].join(","),
  },
});

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
    <Container
      sx={{
        margin: "auto",
        paddingTop: "24px",
      }}
    >
      <Grid2
        container
        columnSpacing={1}
        sx={{
          boxShadow: "0px 0px 5rem gray",
          padding: "12px",
          borderRadius: "16px",
        }}
      >
        <Stack direction="row">
          <Grid2 xs={8}>
            <Avatar
              src={userData?.user?.photo}
              sx={{
                minWidth: 250,
                minHeight: 250,
                border: "8px solid",
                borderColor: "#FFAF9F",
              }}
            ></Avatar>
          </Grid2>
          <Grid2
            xs={4}
            sx={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3" fontFamily={raleway}>
              {userData?.user?.name}
            </Typography>
            <Link
              href={`http://localhost:3000/api/auth/signout`}
              className=" text-red-700 hover:text-lg hover:text-orange-200"
            >
              <ExitToAppIcon />
            </Link>
          </Grid2>
        </Stack>
        <Grid2 xs={12} sx={{ marginTop: 2 }}></Grid2>
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
          <Stack spacing={2} justifyContent="center" alignItems="center">
            {userData?.user?.Rent.map((rent: Rent) => {
              return (
                <Paper
                  variant="outlined"
                  key={rent.id}
                  className="w-5/6 md:w-3/4"
                  sx={{
                    padding: 1,
                    borderRadius: "24px",
                    backgroundColor: "#FFFFFC",
                  }}
                >
                  <Grid2
                    container
                    columnSpacing={1}
                    rowSpacing={2}
                    sx={{
                      display: "flex",
                      justifyItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Grid2
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        fontSize={24}
                        fontFamily={raleway}
                      >{`номер заказа: ${rent.id}`}</Typography>
                    </Grid2>
                    <Grid2
                      xs={12}
                      sx={{
                        display: "flex",
                        justifyItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <hr className=" border-1 w-2/4 border-r-gray-500"></hr>
                    </Grid2>
                    <Grid2 xs={12}>
                      <Link href={`/restaurants/${rent.restaurant.id}`}>
                        <Typography
                          sx={{
                            display: "flex",
                            justifyItems: "center",
                            justifyContent: "center",
                          }}
                          variant="h3"
                          className="hover:font-bold"
                        >
                          {rent.restaurant.title}
                        </Typography>
                      </Link>
                    </Grid2>
                    <Stack>
                    <Stack 
                      direction="row"
                      divider={<Divider orientation="vertical" />}
                      spacing={2}
                      sx={{
                        padding: "14px",
                        borderRadius: "24px",
                        backgroundColor: "#FFAF9F",
                      }}
                    >
                      <Typography variant="h3" fontSize={18}>
                        Дата:{" "}
                        {moment(rent.timeStart, "YYYY-MM-DD HH:mm").format(
                          "YYYY/MM/DD"
                        )}
                      </Typography>
                      <Typography variant="h3" fontSize={18}>
                        Время начала:{" "}
                        {moment
                          .utc(rent.timeStart, "YYYY-MM-DD HH:mm")
                          .format("HH:mm")}
                      </Typography>
                      <Typography variant="h3" fontSize={18}>
                        Время конца:{" "}
                        {moment
                          .utc(rent.timeEnd, "YYYY-MM-DD HH:mm")
                          .format("HH:mm")}
                      </Typography>
                    </Stack>
                    <Stack alignContent="center" textAlign="center"
                      sx={{
                        display: "flex",
                        padding: "16px",
                        borderRadius: "24px",
                        backgroundColor: "#fcff60",
                        marginY: "10px",
                      }}
                    >
                      {rent?.slots.map((slot: slot) => {
                        return (
                          <Typography key={slot.id}>
                            столик: {slot.slot.discription} на{" "}
                            {slot.slot.amountPeople} персоны
                          </Typography>
                        );
                      })}
                    </Stack>
                    <Stack textAlign="center" sx={{
                        display: "flex",
                        justifyItems: "center",
                        justifyContent: "center",
                        borderRadius: "18px",
                        backgroundColor: "#DBDBDD"
                      }}>
                        <Typography>Статус: {rent.rentStatus.title}</Typography>
                        <Typography>
                          Время создания:{" "}
                          {moment(rent.createdAt, "YYYY-MM-DD HH:mm").format(
                            "YYYY/MM/DD HH:mm"
                          )}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid2>
                </Paper>
              );
            })}
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
}
