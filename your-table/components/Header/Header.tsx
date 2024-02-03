"use client";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import HeaderLinkContainer from "./HeaderLinkContainer";
import Link from "next/link";
import { Avatar, Divider, Stack } from "@mui/material";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const links = [
    { name: "Поиск", href: "/" },
    { name: "Профиль", href: "/home" },
  ];
  const session = useSession();
  const [avatatLink, setAvatarLink] = useState("/api/auth/signin");

  return (
    <Grid2
      className=" shadow-lg"
      sx={{ backgroundColor: ["#9a8decff"], minHeight: 50 }}
    >
      <Stack direction="row"
      >
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
          }}
          className="w-full"
        >
          <HeaderLinkContainer Links={links} />
        </Grid2>
        <Grid2 className=" mx-10 my-2">
          {session.status === "authenticated" ? (
            <Link href={`/home`}>
              <Avatar
                src={session?.data?.user?.photo}
                sx={{ width: 80, height: 80 }}
              ></Avatar>
            </Link>
          ) : (
            <Link href={`/api/auth/signin`}>
              <Avatar sx={{ width: 80, height: 80 }}></Avatar>
            </Link>
          )}
        </Grid2>
      </Stack>
    </Grid2>
  );
}
