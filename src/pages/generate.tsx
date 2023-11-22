/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type NextPage } from "next";
import { useState } from "react";
import FormGroup from "~/components/FormGroup";
import Input from "~/components/Input";
import { api } from "~/utils/api";
import Image from "next/image";
import Head from "next/head";

const colors = [
  "red",
  "pink",
  "orange",
  "teal",
  "green",
  "blue",
  "yellow",
  "indigo",
  "purple",
];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
  });

  const [image, setImage] = useState<string | undefined>("");

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      if (!data.image) return;
      setImage(data.image);
    },
  });

  const handleSubit = (e: React.FormEvent) => {
    e.preventDefault();
    generateIcon.mutate(form);
  };

  return (
    <>
      <Head>
        <title>Generate Icons</title>
      </Head>
      <main className="container mx-auto mt-14 flex min-h-screen flex-col items-center">
        <div className="mb-16 flex w-full flex-col items-center">
          <h1 className="mb-6 text-6xl font-semibold">Generate AI icons</h1>
          <p className="text-xl">
            Fill your from below to start generating your icons
          </p>
        </div>
        <form
          onSubmit={handleSubit}
          className="flex w-full flex-col items-center gap-4"
        >
          <h2 className="mb-2 text-3xl">1. Describe your icon idea.</h2>
          <FormGroup>
            <Input
              value={form.prompt}
              onChange={(e) =>
                setForm({
                  ...form,
                  prompt: e.target.value,
                })
              }
            />
          </FormGroup>

          <h2 className="mb-2 mt-12 text-3xl">2. Pick your icon color</h2>
          <FormGroup>
            <div className="radio-input">
              {colors.map((color) => {
                return (
                  <>
                    <input
                      key={color}
                      onChange={(e) =>
                        setForm({ ...form, color: e.target.value })
                      }
                      value={color}
                      name="color"
                      id={color}
                      type="radio"
                    />
                    <label
                      htmlFor={color}
                      className="m-4 flex w-6 flex-col items-center gap-2"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
                          <g
                            stroke-linejoin="round"
                            stroke-linecap="round"
                            id="SVGRepo_tracerCarrier"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            <g id="Interface / Check">
                              <path
                                stroke-linejoin="round"
                                stroke-linecap="round"
                                stroke-width="2"
                                stroke="#ffffff"
                                d="M6 12L10.2426 16.2426L18.727 7.75732"
                                id="Vector"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                    </label>
                  </>
                );
              })}
            </div>
          </FormGroup>

          <button
            className="relative mx-2 w-56 items-center rounded-xl bg-indigo-600 px-3 py-2 text-slate-200 shadow-md duration-300 hover:bg-indigo-800 disabled:bg-gray-500"
            disabled={generateIcon.isLoading || !form.prompt}
          >
            {generateIcon.isLoading && (
              <div className="spinner absolute left-0"></div>
            )}
            Generate
          </button>
        </form>

        {image && (
          <>
            <h2 className="m-12 text-2xl font-bold text-indigo-600">
              Your Icons
            </h2>
            <section className="grid grid-cols-4 gap-4">
              <Image
                src={image}
                alt={form.prompt}
                width="100"
                height="100"
                className="w-full"
              />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
