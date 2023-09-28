import Layout from "@/components/layout";
import { Button, Input } from "@nextui-org/react";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { useState } from "react";

export default function Edit() {
  const user = useUser();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  return (
    <form className="flex  h-full justify-center overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] px-[80px] py-[120px]">
      <div className="flex w-[50%]  flex-col items-center gap-6">
        <h1 className="text-4xl font-bold">Edit Profile</h1>
        <Input
          className="outline-none"
          key={"outside"}
          type="text"
          label="Username"
          labelPlacement={"outside"}
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          className="outline-none"
          key={"inside"}
          type="email"
          label="Email Address"
          labelPlacement={"outside"}
          placeholder="your@email.com"
          defaultValue={user?.email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="border-none bg-white text-black hover:text-slate-200"
          variant="ghost"
        >
          Save Changes{" "}
        </Button>
      </div>
    </form>
  );
}

Edit.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
