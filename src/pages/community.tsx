/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { api } from "~/utils/api";

const Card = ({
  icon,
  prompt,
  date,
  url,
}: {
  icon: string;
  prompt: string;
  date: Date;
  url: string;
}) => {
  return (
    <>
      <div className="glass duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-xl">
        <Link
          target="_blank"
          href={url}
          className="mb-4 block text-xl font-semibold text-gray-900 hover:text-primary  sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px]"
        >
          <Image
            src={icon}
            alt={prompt}
            width={384}
            height={384}
            className="w-96 rounded-xl"
          />
          <div className="py-4 text-center">
            <h3 className="h-16 w-full hover:text-indigo-800">{prompt}</h3>
            <p className="text-body-color dark:text-dark-6 mb-7 text-base leading-relaxed">
              {`Created at: ${date.toLocaleDateString("fr")}`}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

const ShowcasePage: NextPage = () => {
  const icons = api.icons.getCommunityIcons.useQuery();
  return (
    <>
      <Head>
        <title>Community icons</title>
      </Head>
      <main className="container mx-auto mt-14 flex min-h-screen flex-col items-center">
        <h1 className="mb-8  text-5xl">Community icons</h1>
        {/* <section className="bg-gray-2 dark:bg-dark pb-10 pt-20 lg:pb-20 lg:pt-[120px]">
          <div className="container">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </section> */}

        <ul className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 xl:grid-cols-4">
          {icons.data?.map((icon) => {
            return (
              //   <li key={icon.id}>
              //     {icon.imageUrl && (
              //       <Image
              //         className="w-full rounded-xl shadow-xl"
              //         src={icon.imageUrl || ""}
              //         width={150}
              //         height={150}
              //         alt={icon.prompt || "ai icon generated"}
              //       />
              //     )}
              //   </li>
              <Card
                url={icon.imageUrl || ""}
                date={icon.createdAt}
                prompt={icon.prompt || ""}
                key={icon.id}
                icon={icon.imageUrl || ""}
              />
            );
          })}
        </ul>
      </main>
    </>
  );
};

export default ShowcasePage;
