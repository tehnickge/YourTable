import { Button, ButtonGroup, Typography } from "@mui/material";
import Link from "next/link";

export default function HeaderLinkContainer(props: any) {
  return (
    <ButtonGroup variant="text" color="inherit" aria-label="text button group">
      {props.Links.map((link: any) => {
        return (
          <Link href={link.href} key={link} className="">
            <Button><Typography color={"#D3D3D3"} variant="h5" className="hover:text-zinc-50">{link.name}</Typography></Button>
          </Link>
        );
      })}
    </ButtonGroup>
  );
} 
