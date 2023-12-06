import Link from "next/link";

export default function HeaderLinkContainer(props: any) {
  return (
    <div className="">
      {props.Links.map((link: any) => {
        return (
          <Link href={link.href} key={link} className="mx-5 text-black hover:text-lime-600">
            {link.name}
          </Link>
        );
      })}
    </div>
  );
}
