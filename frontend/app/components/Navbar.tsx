import Link from "next/link"
import Menu from "./Menu"
import SearchBar from "./SearchBar"
import NavIcons from "./NavIcons"
import Image from "next/image"
import logo2 from "@/public/logo2.jpg"

const Navbar = () => {
  return (
    <div className="h-20 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative bg-[#FFFAF0]">
      {/*MOBILE*/}
      <div className="h-full flex items-center justify-between md:hidden">
        <Link href="/">
          <div className="text-2xl tracking-wide">Kashvi</div>
        </Link>
        <Menu />
      </div>
      {/*DESKTOP*/}
      <div className="hidden md:flex items-center justify-between gap-8 h-full">
        {/*LEFT*/}
        <div className="w-1/3 xl:w-1/2 flex items-center gap-12">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-[80px] h-[80px] mix-blend-multiply">
              <Image
                src={logo2 || "/placeholder.svg"}
                alt="logo"
                fill
                style={{ objectFit: "contain" }}
                className="opacity-90"
                priority
              />
            </div>
          </Link>
          <div className="hidden xl:flex gap-8">
            <Link href="/">Home</Link>
            <Link href="/">NewIn</Link>
            <Link href="/">Collections</Link>
            <Link href="/">About</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
        {/*RIGHT*/}
        <div className="w-2/3 xl:w-1/2 flex items-center justify-end gap-6">
          <div className="flex-1 flex justify-end">
            <SearchBar />
          </div>
          <NavIcons />
        </div>
      </div>
    </div>
  )
}

export default Navbar

