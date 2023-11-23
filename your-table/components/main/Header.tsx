import Link from "next/link";
import './Header.css'

export default function Header() {
  return (
    <div className="header">
      <div className="header__container_link">
        <Link href={`/`}>search</Link>
        <Link href={`/`}>acc</Link>
        <Link href={`/`}>home</Link>
      </div>
      <div className="header__container_menu">
        <Link href={'/'}>JOPA</Link>
      </div>
    </div>
  );
}
