import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "./Button";
import { useBuyCredits } from "~/hooks/useBuyCredits";

function Header() {
  const session = useSession();
  const { buyCredits } = useBuyCredits();
  const isLogedIn = !!session.data;
  return (
    <header className="glass container mt-4 flex  h-24 items-center justify-between rounded-xl bg-slate-200  ">
      <Link href="/" className="hidden duration-200 hover:scale-110 md:block ">
        <Image src="/logo.png" alt="logo" width={75} height={0} />
      </Link>
      <ul>
        <li>
          <Link href="/generate">
            <button className="button" data-text="Awesome">
              <span className="actual-text">&nbsp;GENERATE&nbsp;</span>
              <span aria-hidden="true" className="hover-text">
                &nbsp;GENERATE&nbsp;
              </span>
            </button>
          </Link>
        </li>
      </ul>
      <ul>
        {isLogedIn && (
          <div className="flex items-center justify-center gap-2">
            <li>
              <button
                className=" bg-indigo-800 px-4 py-2 text-slate-200"
                onClick={() => buyCredits().catch(console.error)}
              >
                Buy credits
              </button>
            </li>
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
          </div>
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
