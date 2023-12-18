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

  const SearchChangeHandler = (event: any) => {
    setSearchInput(event.target.value);
  };

  const ButtonChangeHandler = () => {
    setFilterStars(filterStars + 1);
    console.log(filterStars);
  };

  const CheckBoxChangeHandler = (event: any) => {
    console.log(event.target.checked);
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

  console.log(filterKitchens);
  console.log(searchInput);
  console.log(filterStars);

  console.log(restaurants);

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
          <MenuItem>
            <label htmlFor="filter1">
              <Checkbox
                id="filter1"
                onChange={CheckBoxChangeHandler}
                value={"Русская"}
              ></Checkbox>
              Русская
            </label>
          </MenuItem>
          <MenuItem>
            <label htmlFor="filter2">
              <Checkbox
                id="filter2"
                onChange={CheckBoxChangeHandler}
                value={"Фрацузкая"}
              />
              Фрацузкая
            </label>
          </MenuItem>
          <MenuItem>
            <label htmlFor="filter3">
              <Checkbox
                id="filter3"
                onChange={CheckBoxChangeHandler}
                value={"Итальянская"}
              />
              Итальянская
            </label>
          </MenuItem>
        </Menu>
      </Grid2>
    </Grid2>
  );
}
