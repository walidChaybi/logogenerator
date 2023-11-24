/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { api } from "~/utils/api";

const ShowcasePage: NextPage = () => {
  const icons = api.icons.getIcons.useQuery();
  return (
    <>
      <Head>
        <title>Your icons</title>
      </Head>
      <main className="container mx-auto mt-14 flex min-h-screen flex-col items-center">
        <h1 className="mb-8  text-5xl">Your icons</h1>

        <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-4 xl:grid-cols-6">
          {icons.data?.map((icon) => {
            return (
              <li key={icon.id}>
                {icon.imageUrl && (
                  <Image
                    className="w-full"
                    src={icon.imageUrl || ""}
                    width={150}
                    height={150}
                    alt={icon.prompt || "ai icon generated"}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default ShowcasePage;
