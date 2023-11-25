"use client"
import { usePathname } from "next/navigation";

export default function User() {

    return (
        <div>
            {`user ${(usePathname().split('/'))[2]}`}
        </div>
    )
}