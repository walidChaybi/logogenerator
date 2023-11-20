import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Button from "~/components/Button";
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
      </main>
    </>
  );
};

export default GeneratePage;
