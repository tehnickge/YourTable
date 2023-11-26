"use client"
import { usePathname } from "next/navigation";

type Props = {
    params: {
        id: string
    }
}

export default function Restaurant({ params: {id} } : Props) {

    return(
        <div>{`Restaurant ${(id)}`}</div>
    )
}