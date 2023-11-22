import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
            <button className="btn" data-text="Awesome">
              <span aria-hidden="true" className="hover-text">
                &nbsp;GENERATE&nbsp;
              </span>
            </button>
          </Link>
        </li>
      </ul>
      <ul>
        {isLogedIn && (
          <div className="flex flex-col items-center justify-center gap-2">
            <li>
              <button
                className=" mx-2 rounded-xl bg-indigo-600 px-3 py-2 text-slate-200 shadow-md duration-300 hover:bg-indigo-800"
                onClick={() => buyCredits().catch(console.error)}
              >
                Buy credits
              </button>
            </li>
            <li>
              <button
                className="w-24 rounded-xl bg-gray-600 px-3 py-2 text-slate-200 shadow-md hover:bg-gray-800"
                onClick={() => {
                  signOut().catch(console.error);
                }}
              >
                Log out
              </button>
            </li>
          </div>
        )}
        {!isLogedIn && (
          <li>
            <button
              className="w-24 rounded-xl bg-indigo-600 px-3 py-2 text-slate-200 shadow-md duration-300 hover:bg-indigo-800"
              onClick={() => {
                signIn().catch(console.error);
              }}
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
