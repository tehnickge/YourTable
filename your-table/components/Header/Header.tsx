"use client";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import HeaderLinkContainer from "./HeaderLinkContainer";
import Link from "next/link";
import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const links = [
    { name: "search", href: "/" },
    { name: "home", href: "/home" },
  ];
  const session = useSession();
  const [avatatLink, setAvatarLink] = useState('/api/auth/signin');
  const a = true;

  return (
    <Grid2
      container
      xs={12}
      className=" shadow-lg"
      sx={{ backgroundColor: ['#0000CD'], minHeight: 50}}
    >
      <Grid2 xs={11} sx={{ display: "flex",
                          justifyContent: "start",
                          alignItems: "center"}} 
                          className="w-full">
        <HeaderLinkContainer Links={links} />
      </Grid2>
      <Grid2 xs={1}>
      {(session.status === "authenticated") ? (<Link href={`/users/${session?.data?.user?.id}`} className="mx-10">
            <Avatar src={session?.data?.user?.photo} sx={{ width: 50, height: 50 }}></Avatar>
          </Link>) 
          : 
          (<Link href={`/api/auth/signin`} className="mx-10">
            <Avatar sx={{ width: 50, height: 50 }}></Avatar>
          </Link>)}
          
      </Grid2>
    </Grid2>
  );
}
