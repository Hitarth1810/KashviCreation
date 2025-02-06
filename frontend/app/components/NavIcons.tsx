"use client"
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const NavIcons = () => {
    const [isProfileOpen,SetIsProfileOpen]=useState(false)
    

    const router = useRouter();

    const isLoggedIn = false;

    const handleProfile = () => {
        if (!isLoggedIn) {
          router.push("/");
        } else {
          SetIsProfileOpen((prev) => !prev);
        }
      };
    return (
        <div className="flex items-center gap-4 xl:gap-6">
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        // onClick={login}
      />
      <Image
        src="/cart.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        // onClick={login}
      />
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        // onClick={login}
        onClick={handleProfile}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 ">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor:pointer">Logout</div>
        </div>
      )}
        </div>
    );
}

export default NavIcons;