/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Button from "~/components/Button";
import FormGroup from "~/components/FormGroup";
import Input from "~/components/Input";
import { api } from "~/utils/api";
import Image from "next/image";

const GeneratePage: NextPage = () => {
  const [form, setForm] = useState({
    prompt: "",
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
    setForm({
      prompt: "",
    });
  };

  const session = useSession();

  const isLoggedIn = session.data;

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center ">
        {!isLoggedIn && (
          <Button
            onClick={() => {
              signIn().catch(console.error);
            }}
          >
            sign in
          </Button>
        )}

        {isLoggedIn && (
          <Button
            onClick={() => {
              signOut().catch(console.error);
            }}
          >
            sign Out
          </Button>
        )}

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

          <Button className="w-[200px] rounded-md bg-blue-400 px-4 py-2 hover:bg-blue-300">
            Generate
          </Button>
        </form>
        {image && (
          <Image src={image} alt={form.prompt} width="100" height="100" />
        )}
      </main>
    </>
  );
};

export default GeneratePage;
