import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useBuyCredits } from "~/hooks/useBuyCredits";
import { api } from "~/utils/api";

function Header2() {
  const [showMenu, setShowMenu] = React.useState(false);
  const [showBurger, setShowBurger] = React.useState(false);

  const session = useSession();
  const { buyCredits } = useBuyCredits();
  const isLogedIn = !!session.data;

  const credits = api.user.getCredits.useQuery();

  return (
    <div>
      <nav className="glass container rounded-lg bg-white  shadow-xl dark:bg-gray-800 ">
        <div className="mx-auto max-w-7xl px-8">
          <div className="flex h-24 items-center justify-between">
            <div className=" flex items-center">
              <Link href="/">
                <Image
                  className="hidden md:block"
                  src="/logo.png"
                  width={150}
                  height={75}
                  alt="Workflow"
                />
              </Link>
              <Link href="/">
                <Image
                  className="block md:hidden"
                  src="/logosmall.png"
                  width={50}
                  height={0}
                  alt="Workflow"
                />
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    className="rounded-md  px-3 py-2 text-xl font-medium text-gray-800 hover:text-indigo-500 dark:hover:text-white"
                    href="/generate"
                  >
                    Generate
                  </Link>
                  <Link
                    className="rounded-md px-3 py-2 text-xl font-medium text-gray-800 duration-200 hover:scale-110 hover:text-indigo-500 dark:hover:text-white"
                    href="/community"
                  >
                    Community
                  </Link>

                  <Link
                    className="rounded-md  px-3 py-2 text-xl font-medium text-gray-800 hover:text-indigo-500 dark:hover:text-white"
                    href="/showcase"
                  >
                    Collection
                  </Link>
                </div>
              </div>
            </div>

            <div className="block">
              <div className=" flex items-center md:ml-6">
                <div className="relative ml-3">
                  <div className="relative inline-block text-left">
                    <div className=" ">
                      {isLogedIn && (
                        <p>
                          Credits:{" "}
                          <span className="font-bold text-indigo-950">
                            {credits.data}
                          </span>
                        </p>
                      )}

                      <button
                        onMouseEnter={() => setShowMenu(true)}
                        type="button"
                        className="flex w-full items-center justify-center  py-2"
                        id="options-menu"
                      >
                        {!isLogedIn && (
                          <div
                            className="text-md mx-4 block cursor-pointer rounded-xl bg-indigo-500 px-4 py-1 font-semibold text-white shadow-xl hover:bg-indigo-700"
                            role="menuitem"
                          >
                            <span className="flex flex-col">
                              <span onClick={() => signIn()}>Login</span>
                            </span>
                          </div>
                        )}
                        <Image
                          className="hidden rounded-full shadow-xl md:block"
                          src={session.data?.user.image || "/logosmall.png"}
                          width={40}
                          height={0}
                          alt="user"
                        />
                      </button>
                      {showMenu && (
                        <div
                          onMouseLeave={() => setShowMenu(false)}
                          className="glass absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-800 md:right-0 "
                        >
                          <div
                            className="py-4"
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="options-menu"
                          >
                            {isLogedIn && (
                              <>
                                <div
                                  className="text-md block cursor-pointer  px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  role="menuitem"
                                >
                                  <span className="flex flex-col">
                                    <span onClick={() => buyCredits()}>
                                      Buy Credits
                                    </span>
                                  </span>
                                </div>
                                <div
                                  className="text-md block cursor-pointer px-4 py-2 text-gray-700 hover:bg-indigo-500 hover:text-white dark:text-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  role="menuitem"
                                >
                                  <span className="flex flex-col">
                                    <span
                                      onClick={() => {
                                        signOut();
                                      }}
                                    >
                                      Logout
                                    </span>
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" z-50 -mr-2 flex md:hidden">
              <input
                onClick={() => setShowBurger((showBurger) => !showBurger)}
                type="checkbox"
                id="checkbox"
              />
              <label htmlFor="checkbox" className="toggle">
                <div className="bars" id="bar1"></div>
                <div className="bars" id="bar2"></div>
                <div className="bars" id="bar3"></div>
              </label>
            </div>
          </div>
        </div>
        {showBurger && (
          <div className="md-hidden absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-gray-900">
            <div className="space-y-1 pb-3 pt-2 sm:px-3">
              <Link
                className="block rounded-md px-3 py-2 text-7xl font-medium text-gray-300 dark:text-white"
                href="/generate"
              >
                Generate
              </Link>
              <Link
                className="block rounded-md px-3 py-2 text-7xl font-medium text-gray-300 "
                href="/community"
              >
                Community
              </Link>
              <Link
                className="block rounded-md px-3 py-2 text-7xl font-medium text-gray-300 "
                href="/showcase"
              >
                Collection
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}

export default Header2;
