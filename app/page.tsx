"use client";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      HOME PAGE
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
