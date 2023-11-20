import { type NextPage } from "next";
import { useState } from "react";
import FormGroup from "~/components/FormGroup";
import Input from "~/components/Input";
import { api } from "~/utils/api";

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
  });

  const generateIcon = api.generate.generateIcon.useMutation({
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleSubit = (e: React.FormEvent) => {
    e.preventDefault();
    generateIcon.mutate(form);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <form onSubmit={handleSubit} className="flex flex-col gap-4">
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
          <button className="w-[200px] rounded-md bg-blue-400 px-4 py-2 hover:bg-blue-300">
            Generate
          </button>
        </form>
      </main>
    </>
  );
};

export default GeneratePage;
