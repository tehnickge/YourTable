"use client";

import { Button, Fab, Icon, Link, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Slot, Zone } from "@prisma/client";
import { PropsWithChildren, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableBarIcon from "@mui/icons-material/TableBar";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import moment from "moment";
import { useSession } from "next-auth/react";

export default function RestaurantZonesAndSlots(props: PropsWithChildren) {
  const [startDate, setStartDate] = useState(new Date());
  const [isMenuSlotsOpen, setMenuSlotsState] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTimeBegin, setSelectedTimeBegin] = useState(null);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);

  const [arrayTimeBegin, setArrayTimeBegin] = useState([]);
  const [arrayTimeEnd, setArrayTimeEnd] = useState([]);

  const user = useSession();
  console.log("User", user);

  const getFreeTimePerDate = () => {
    const dataToFetch = {
      startDate: moment(startDate).format("YYYY-MM-DD"),
      selectedSlot: selectedSlot,
      restaurantId: props.zonesAndSlots.id,
    };

    if (
      dataToFetch.restaurantId === null ||
      dataToFetch.selectedSlot === null ||
      dataToFetch.startDate === null
    ) {
      return console.log("ERROR DATA is Empty");
    }

    fetch("http://localhost:3000/api/rents/getarraytimesperdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToFetch),
    })
      .then((res: any) => res.json())
      .then((data: any) => {if(data !== null) setArrayTimeBegin([...data])});
  };

  const makeRent = () => {
    const dataToFetch = {
      slotId: selectedSlot,
      timeBegin: selectedTimeBegin,
      timeEnd: selectedTimeEnd,
      restaurantId: props.zonesAndSlots.id,
      startDate: moment(startDate).format("YYYY-MM-DD"),
      userId: user?.data?.user?.id,
    };

    if (
      dataToFetch.slotId === null ||
      dataToFetch.timeBegin === null ||
      dataToFetch.timeEnd === null ||
      dataToFetch.restaurantId === null ||
      dataToFetch.startDate === null ||
      dataToFetch.userId === null
    )
      return alert("Ошибка");

    fetch("http://localhost:3000/api/rents/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToFetch),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === null) {
          alert("Ошибка это время уже занято");
        } else {
          alert(`Заказ под номером ${data.rentId} создан !`);
        }
        console.log(data);
      });
  };

  const selectTimeBeginHandler = (e: any) => {
    // @ts-ignore
    setSelectedTimeBegin((prev: any) => {
      return moment(e.target.id, "HHmm").format("HH:mm:ss");
    });
  };

  const selectTimeEndHandler = (e: any) => {
    // @ts-ignore
    setSelectedTimeEnd((prev: any) => {
      return moment(e.target.id, "HHmm").format("HH:mm:ss");
    });
  };

  const selectSlotHandler = (e: any) => {
    // @ts-ignore
    setSelectedSlot((prev: any) => {
      return Number(e.target.id);
    });
  };

  const menuStateHandler = (e: any) => {
    setMenuSlotsState((prev) => {
      return !prev;
    });
  };

  const datePickerChangeHandler = (data: any) => {
    setStartDate(data);
  };

  useEffect(() => {
    const filtered = arrayTimeBegin.filter((time) => {
      return moment(time, "HHmm").isAfter(moment(selectedTimeBegin, "HHmm"));
    });
    setArrayTimeEnd([...filtered]);
  }, [selectedTimeBegin]);

  useEffect(() => {
    getFreeTimePerDate();
    // if change slot or date time = null
    setSelectedTimeBegin(null);
    setSelectedTimeEnd(null);
  }, [selectedSlot, startDate]);

  useEffect(() => {
    setSelectedTimeEnd(null);
  }, [selectedTimeBegin]);

  return (
    <Grid2
      sx={{
        display: "flex",
        justifyItems: "center",
        alignItems: "stretch",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <Grid2
        sx={{
          display: "flex",
          justifyItems: "center",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Fab
          variant="extended"
          color="inherit"
          onClick={(e) => menuStateHandler(e)}
        >
          <TableBarIcon />
          столики
        </Fab>
      </Grid2>
      {isMenuSlotsOpen && (
        <Paper>
          <Grid2>
            <Typography>Дата:</Typography>
            <DatePicker
              selected={startDate}
              onChange={datePickerChangeHandler}
              sx={{ zIndex: 50 }}
            />
          </Grid2>

          {props.zonesAndSlots.zones.map((zone: Zone) => {
            return (
              <Grid2 key={zone.id} sx={{ marginLeft: 1, marginRight: 1 }}>
                {zone.discription}
                {zone.slots.map((slot: Slot) => {
                  return (
                    <Button
                      key={slot.id}
                      id={`${slot.id}`}
                      onClick={selectSlotHandler}
                      color={`${selectedSlot == slot.id ? "error" : "info"}`}
                    >
                      {slot.discription}
                    </Button>
                  );
                })}
              </Grid2>
            );
          })}
        </Paper>
      )}
      {isMenuSlotsOpen &&
        (selectedSlot === null ? null : (
          <Paper>
            <Grid2>
              <Typography>Время начала:</Typography>
              {arrayTimeBegin.map((time) => {
                return (
                  <Button
                    key={time}
                    id={`${time}`}
                    onClick={selectTimeBeginHandler}
                    color={`${
                      time == moment(selectedTimeBegin, "HH:mm").format("HH:mm")
                        ? "error"
                        : "info"
                    }`}
                  >
                    {time}
                  </Button>
                );
              })}
            </Grid2>
            <Grid2>
              <Typography>Время конца:</Typography>
              {arrayTimeEnd.map((time) => {
                return (
                  <Button
                    key={time}
                    id={`${time}`}
                    onClick={selectTimeEndHandler}
                    color={`${
                      time == moment(selectedTimeEnd, "HH:mm").format("HH:mm")
                        ? "error"
                        : "info"
                    }`}
                  >
                    {time}
                  </Button>
                );
              })}
            </Grid2>
            {user.status === "unauthenticated" && <Link href="http://localhost:3000/users/new"><Typography sx={{margin: "1rem"}} variant="h6">Зарегистрируйтесь или войдите в аккаунт</Typography></Link>}
            <Grid2
              sx={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              <Fab
                variant="extended"
                color="info"
                disabled={
                  selectedSlot === "" ||
                  selectedSlot === null ||
                  selectedTimeBegin === null ||
                  selectedTimeEnd === null ||
                  user.status === "unauthenticated"
                }
                onClick={makeRent}
              >
                <AddCircleOutlineIcon />
                Забронировать
              </Fab>
            </Grid2>
          </Paper>
        ))}
      {props.children}
    </Grid2>
  );
}