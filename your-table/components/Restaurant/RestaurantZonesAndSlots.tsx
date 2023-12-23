"use client";

import { Button, Fab, Icon, Paper, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Slot, Zone } from "@prisma/client";
import { PropsWithChildren, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TableBarIcon from "@mui/icons-material/TableBar";
import moment from "moment";
import zIndex from "@mui/material/styles/zIndex";

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
      "restaurantId": props.zonesAndSlots.id
    }

    if(dataToFetch.restaurantId === null
      || dataToFetch.selectedSlot === null
      || dataToFetch.startDate === null
      ) { return console.log("ERROR DATA YEMPTY")}

    fetch("http://localhost:3000/api/rents/getarraytimesperdate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToFetch),
    }).then((res: any) => res.json()).then((data: any) => setArrayTimeBegin([...data]))

  }

  const selectTimeBeginHandler = (e: any) => {
    // @ts-ignore
    setSelectedTimeBegin((prev: any) => {
      return moment(e.target.id,"HHmm").format("HH:mm:ss")
    })
  }
  
  const selectTimeEndHandler = (e: any) => {
    // @ts-ignore
    setSelectedTimeEnd((prev: any) => {
      return moment(e.target.id,"HHmm").format("HH:mm:ss")
    })
  }

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

  const datePickerChangeHandler = (data : any) => {
    setStartDate(data);
  }

  useEffect(() => {
    const filtered = arrayTimeBegin.filter((time) => { return moment(time,"HHmm").isAfter(moment(selectedTimeBegin,"HHmm")) });
    console.log("filtered",filtered);
    setArrayTimeEnd([...filtered]);
  },[selectedTimeBegin]);

  useEffect(()=> {
    getFreeTimePerDate();
  },[selectedSlot, startDate])


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
          <Grid2>
            <Typography>Дата:</Typography>
            <DatePicker
              selected={startDate}
              onChange={datePickerChangeHandler}
              sx={{zIndex: 50}}
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
      { isMenuSlotsOpen && ((selectedSlot === null) ? 
      null
       : 
       <Paper>
        <Grid2>
        <Typography>Время начала:</Typography>
          {arrayTimeBegin.map((time) => {
            return (<Button key={time} id={`${time}`} onClick={selectTimeBeginHandler} >{time}</Button>)
          })}
        </Grid2>
        <Grid2>
        <Typography>Время конца:</Typography>
        {arrayTimeEnd.map((time) => {
            return (<Button key={time} id={`${time}`} onClick={selectTimeEndHandler} >{time}</Button>)
          })}
        </Grid2>
       </Paper>)}
      {props.children}
    </Grid2>
  );
}
