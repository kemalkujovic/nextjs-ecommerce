import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition flex items-center">
        <Image src="/logo.png" alt="Logo" height={50} width={50} />
      </div>
    </Link>
  );
};

export default Logo;
