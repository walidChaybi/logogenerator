import { type NextPage } from "next";
import { useState } from "react";
import { set } from "zod";
import FormGroup from "~/components/FormGroup";
import Input from "~/components/Input";

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({});
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <form className="flex flex-col gap-4">
          <FormGroup>
            <Input
              onChange={(e) =>
                setForm({
                  ...form,
                  prompt: e.target.value,
                })
              }
            />
          </FormGroup>

          <button className="rounded-md bg-blue-400 px-4 py-2 hover:bg-blue-300">
            Generate
          </button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
