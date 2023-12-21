"use client";

import { useEffect, useState } from "react";
import { useSearchInput } from "../store/StoreSearch";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Checkbox,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Kitchen } from "@prisma/client";

export default function SearchInput(props: any) {
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
  const fetchRestaurants = useSearchInput(
    (state: any) => state.fetchRestaurants
  );
  const restaurants = useSearchInput((state: any) => state.restaurants);
  const filteredRest = useSearchInput((state: any) => state.filteredRestautants);
  const [allKitchen, setAllKitchen] = useState([]);

  const SearchChangeHandler = (event: any) => {
    setSearchInput(event.target.value);
  };

  const ButtonChangeHandler = () => {
    setFilterStars(filterStars + 1);
  };

  const CheckBoxChangeHandler = (event: any) => {
    if (event.target.checked) {
      addFilterKitchens(event.target.value);
    } else {
      deleteFilterKitchens(event.target.value);
    }
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filteredRest;
  }, [filterKitchens, searchInput]);

  // console.log(filterKitchens);
  // console.log(searchInput);
  // console.log(filterStars);
  // console.log(restaurants);

  useEffect(() => {
    fetch("http://localhost:3000/api/restaurants/kitchens").then((res)=> res.json()).then((it) => setAllKitchen(it));
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Grid2 container>
      <Grid2 sm={12} sx={{backgroundColor: "#00000039", borderRadius: 30}}>
        <FormControl
          fullWidth
          sx={{ px: 10, py: 1, paddingBottom: 4, borderRadius: 40}}
          variant="standard"
        >
          <InputLabel
            htmlFor="standard-adornment-search"
            sx={{ my: 5, mx: 4, color: ["black"] }}
          >
            Поиск
          </InputLabel>
          <Input
            id="standard-adornment-search"
            startAdornment={<InputAdornment position="start"></InputAdornment>}
            onChange={SearchChangeHandler}
          />
        </FormControl>
      </Grid2>
      <Grid2 sm={12} sx={{px: 20}}>
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Кухни
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {allKitchen.map((kitchen : Kitchen) => {
            return ( 
              <MenuItem key={kitchen.id}>
              <label htmlFor="filter1">
                <Checkbox
                  id={`${kitchen.id}`}
                  onChange={CheckBoxChangeHandler}
                  value={kitchen.type}
                ></Checkbox>
                {kitchen.type}
              </label>
            </MenuItem>
            )
          })}
          
        </Menu>
      </Grid2>
    </Grid2>
  );
}
