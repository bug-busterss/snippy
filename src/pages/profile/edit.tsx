import Layout from "@/components/layout";
import { Button, Input } from "@nextui-org/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Edit() {
  const supabaseClient = useSupabaseClient();
  const user = useUser();

  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState("");

  return (
    <form
      className="flex  h-full justify-center overflow-auto bg-gradient-to-b from-[#2e026d] to-[#15162c] px-[80px] py-[120px]"
      onSubmit={async (e) => {
        e.preventDefault();
        if (email?.trim() === "" || username?.trim() === "") return;
        await supabaseClient.auth.updateUser({
          email,
          data: { metadata: { username } },
        });
        toast.success("Profile Updated");
      }}
    >
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
          value={email}
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
