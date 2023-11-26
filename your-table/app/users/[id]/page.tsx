"use client"
import { usePathname } from "next/navigation";

type Props = {
    params: {
        id: string
    }
}

export default function User({ params: { id } } : Props) {

    return (
        <div>
            {`user ${id}`}
        </div>
    )
}