"use client"
import { usePathname } from "next/navigation";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return `Loading ${usePathname()}`
  }