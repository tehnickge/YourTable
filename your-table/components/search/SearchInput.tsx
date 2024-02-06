"use client";

import { useEffect, useState } from "react";
import { useSearchInput } from "../store/StoreSearch";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Checkbox,
  FormControl,
  IconButton,
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
  const filteredRest = useSearchInput(
    (state: any) => state.filteredRestautants
  );
  const [allKitchen, setAllKitchen] = useState([]);

  const SearchChangeHandler = (event: any) => {
    setSearchInput(event.target.value);
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

  useEffect(() => {
    fetch("http://localhost:3000/api/restaurants/kitchens")
      .then((res) => res.json())
      .then((it) => setAllKitchen(it));
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
      <Grid2
        sm={12}
        sx={{
          backgroundColor: "#d6daff",
          backgroundImage: "linear-gradient(135deg, #d6daff 0%, #ffebe4 100%)",
          borderRadius: "80px",
          height: "70px",
        }}
      >
        <FormControl
          fullWidth
          sx={{ px: 10, py: 0, paddingBottom: 4, borderRadius: 40 }}
          variant="standard"
        >
          <InputLabel
            htmlFor="standard-adornment-search"
            sx={{
              my: 3,
              mx: 1,
              color: ["black"],
              fontSize: "24px",
              backgroundColor: "transperent",
              padding: "4px",
              paddingX: "8px",
              borderRadius: "24px",
              ":hover": {
                border: "1px solid gray",
                borderColor: "#9a8decff",
                color: "#9a8decff",
              },
            }}
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
      <Grid2
        sm={12}
        sx={{
          marginTop: "16px",
          marginBottom: "16px"
        }}
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          variant="outlined"
          sx={{
            borderRadius: "24px",
            borderColor: "#9a8decff",
            color: "#9a8decff",
            ":hover": {
              borderColor: "purple",
              color: "purple",
            },
          }}
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
          {allKitchen.map((kitchen: Kitchen) => {
            return (
              <MenuItem key={kitchen.id}>
                <label htmlFor="filter1">
                { (!filterKitchens.includes(kitchen.type)) ? (<Checkbox
                    id={`${kitchen.id}`}
                    onChange={CheckBoxChangeHandler}
                    value={kitchen.type}
                  ></Checkbox>) : (<Checkbox
                    id={`${kitchen.id}`}
                    onChange={CheckBoxChangeHandler}
                    value={kitchen.type}
                    checked
                  ></Checkbox>) }
                  {kitchen.type} 
                </label>
              </MenuItem>
            );
          })}
        </Menu>
      </Grid2>
    </Grid2>
  );
}
