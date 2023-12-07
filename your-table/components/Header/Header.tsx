"use client";
import Link from "next/link";
import HeaderLinkContainer from "./HeaderLinkContainer";

export default function Header() {
  const links = [
    { name: "search", href: "/" },
    { name: "acc", href: "/" },
    { name: "home", href: "/" },
  ];

  return (
    <div className="header text-center border-4 border-black bg-amber-200 h-20 flex">
      <HeaderLinkContainer Links={links} className={"flex"} />
      <div className="header__container_menu text-right">
        <Link href={"/api/auth/signin"} className="mx-10">
          HomeInfo
        </Link>
      </div>
    </div>
  );
}
