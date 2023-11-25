"use client"
import { usePathname } from "next/navigation";

export default function Restaurant() {

    return(
        <div>{`Restaurant ${(usePathname().split('/'))[2]}`}</div>
    )
}