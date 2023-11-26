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
import Link from "next/link";
import React from "react";

const colors = [
  "red",
  "pink",
  "green",
  "orange",
  "teal",
  "blue",
  "yellow",
  "indigo",
  "purple",
];
const shapes = ["square", "circle", "rounded"];

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
    color: "",
    number: 1,
    shape: "",
  });

  const [image, setImage] = useState<string | undefined>("");

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      if (!data.imageUrl) return;
      setImage(data.imageUrl);
    },
  });

  const handleSubit = (e: React.FormEvent) => {
    e.preventDefault();
    generateIcon.mutate(form);
  };

  return (
    <>
      <Head>
        <title>Generate AI Icons</title>
      </Head>
      <main className="container mx-auto mt-14 flex min-h-screen flex-col items-center">
        <div className="mb-12 flex w-full flex-col items-center">
          <h1 className="mb-4 text-6xl font-semibold">Generate AI icons</h1>
          <p className="text-lg text-gray-500">
            Fill your from below to start generating your icons
          </p>
        </div>
        <form
          onSubmit={handleSubit}
          className="flex w-full flex-col items-center gap-12"
        >
          <h2 className="mt-8 cursor-default border-b border-b-gray-300 pb-4 text-3xl text-gray-600">
            1. Icon idea, be as descriptive as possible
          </h2>
          <FormGroup>
            <textarea
              className="input__field"
              placeholder="Bodybuilding, strong man with a red t-shirt, full body"
              value={form.prompt}
              onChange={(e) =>
                setForm({
                  ...form,
                  prompt: e.target.value,
                })
              }
            />
          </FormGroup>

          <h2 className="mt-8 cursor-default border-b border-b-gray-300 pb-4 text-3xl text-gray-600">
            2. Choose a Style
          </h2>
          <FormGroup>
            <div className="radio-input">
              {shapes.map((shape) => {
                return (
                  <>
                    <input
                      key={shape}
                      onChange={(e) =>
                        setForm({ ...form, shape: e.target.value })
                      }
                      value={shape}
                      name="shape"
                      id={shape}
                      type="radio"
                    />
                    <label
                      htmlFor={shape}
                      className="mx-4 flex w-12 flex-col items-center justify-center"
                    >
                      <span>
                        <svg
                          className="mt-12"
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
                                stroke="indigo"
                                d="M6 12L10.2426 16.2426L18.727 7.75732"
                                id="Vector"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </span>
                      {shape}
                    </label>
                  </>
                );
              })}
            </div>
          </FormGroup>
          {/* <h2 className="mt-8 cursor-default border-b border-b-gray-300 pb-4 text-3xl text-gray-600">
            3. How many icons to generate? (max: 4)
          </h2>
          <FormGroup>
            <div className="PB-range-slider-div">
              <input
                type="range"
                step={1}
                min="1"
                max="4"
                value="1"
                className="PB-range-slider"
                id="myRange"
              />
              <p className="PB-range-slidervalue">{form.number}</p>
            </div>
          </FormGroup> */}
          <button
            className="relative mx-2 mb-40 mt-20 w-96 items-center rounded-xl bg-indigo-600 px-3 py-2 text-slate-100 shadow-md duration-300 hover:bg-indigo-800 disabled:bg-gray-500"
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
            <section className="grid grid-cols-4 gap-4">
              <Link href={image}>
                <Image
                  src={image}
                  alt={form.prompt}
                  width="200"
                  height="200"
                  className="w-full"
                />
              </Link>
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default GeneratePage;
