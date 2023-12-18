import { CircularProgress, Container } from "@mui/material";


export default function Loading() {

    return <Container sx={{display: "flex", justifyContent: "center"}}><CircularProgress color="secondary" sx={{minWidth: 200, minHeight: 200}} /></Container>;

  }