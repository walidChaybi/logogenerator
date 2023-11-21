import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";

function Header() {
  const session = useSession();

  const isLogedIn = !!session.data;
  return (
    <header className="glass container mt-4 flex  h-24 items-center justify-between rounded-xl bg-slate-200  ">
      <Link href="/" className="hidden duration-200 hover:scale-110 md:block ">
        <Image src="/logo.png" alt="logo" width={75} height={0} />
      </Link>
      <ul>
        <li>
          <Link className="button2 " href="/generate">
            Generate
          </Link>
        </li>
      </ul>
      <ul>
        {isLogedIn && (
          <li>
            <Button
              variant="logout"
              onClick={() => {
                signOut().catch(console.error);
              }}
            >
              Log out
            </Button>
          </li>
        )}
        {!isLogedIn && (
          <li>
            <Button
              variant="login"
              onClick={() => {
                signIn().catch(console.error);
              }}
            >
              Login
            </Button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
