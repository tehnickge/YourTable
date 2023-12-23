"use client";

import { Button, Fab, Icon, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Slot, Zone } from "@prisma/client";
import { PropsWithChildren, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableBarIcon from "@mui/icons-material/TableBar";
import moment from "moment";

const arrayTime = ["6:00", "7:00", "8:00", "9:00", "10:00","11:00"]


export default function RestaurantZonesAndSlots(props: PropsWithChildren) {
  const [startDate, setStartDate] = useState(new Date());
  const [isMenuSlotsOpen, setMenuSlotsState] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedTimeBegin, setSelectedTimeBegin] = useState(null);
  const [selectedTimeEnd, setSelectedTimeEnd] = useState(null);

  const [arrayTimeBegin, setArrayTimeBegin] = useState([]);
  const [arrayTimeEnd, setArrayTimeEnd] = useState([]);

  const getFreeTimePerDate = () => {
    const dataToFetch = {
      "startDate" : moment(startDate).format("YYYY-MM-DD"), 
      "selectedSlot" : selectedSlot,
      "restaurantId": props.zonesAndSlots.id,
      "timeBegin": selectedTimeBegin
    }

    if(dataToFetch.restaurantId === null
      || dataToFetch.selectedSlot === null
      || dataToFetch.startDate === null
      || dataToFetch.timeBegin === null
      ) { return console.log("ERROR DATA YEMPTY")}

    fetch("http://localhost:3000/api/rents/getarraytimesperdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToFetch),
    }).then((res: any) => res.json()).then((data) => console.log(data))

  }

  const selectTimeBeginHandler = (e: any) => {
    setSelectedTimeBegin((prev: any) => {
      return moment(e.target.id,"HHmm").format("HH:mm:ss")
    })
  }
  
  const selectTimeEndHandler = (e: any) => {
    setSelectedTimeEnd((prev: any) => {
      return moment(e.target.id,"HHmm").format("HH:mm:ss")
    })
  }

  const selectSlotHandler = (e: any) => {
    setSelectedSlot((prev: any) => {
      return Number(e.target.id);
    });
  };

  const menuStateHandler = (e: any) => {
    setMenuSlotsState((prev) => {
      return !prev;
    });
  };

  console.log(selectedSlot);
  console.log(selectedTimeBegin);
  console.log(selectedTimeEnd);
  console.log(startDate);
  return (
    <Grid2>
      <button onClick={getFreeTimePerDate}>KEK</button>
      <Fab variant="extended" color="inherit" onClick={(e) => menuStateHandler(e)}>
        <TableBarIcon />
        столики
      </Fab>
      {isMenuSlotsOpen && (
        <Paper>
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
                    >
                      {slot.discription}
                    </Button>
                  );
                })}
              </Grid2>
            );
          })}
          <Grid2>
            <Typography>Дата:</Typography>
            <DatePicker
              selected={startDate}
              onChange={(date: any) => setStartDate(date)}
            />
          </Grid2>
        </Paper>
      )}
      { isMenuSlotsOpen && ((selectedSlot === null) ? 
      null
       : 
       <Paper>
        <Grid2>
        <Typography>Время начала:</Typography>
          {arrayTime.map((time) => {
            return (<Button key={time} id={`${time}`} onClick={selectTimeBeginHandler} >{time}</Button>)
          })}
        </Grid2>
        <Grid2>
        <Typography>Время конца:</Typography>
        {arrayTimeBegin.map((time) => {
            return (<Button key={time} id={`${time}`} onClick={selectTimeEndHandler} >{time}</Button>)
          })}
        </Grid2>
       </Paper>)}
      {props.children}
    </Grid2>
  );
}
