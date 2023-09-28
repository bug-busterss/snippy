import Layout from "@/components/layout";
import { Button, Input } from "@nextui-org/react";
import {
  type User,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function EditPage() {
  const user = useUser();

  if (!user) return <p>no user found</p>;

  return <Edit user={user} />;
}

function Edit({ user }: { user: User }) {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(user.email);
  const [name, setName] = useState<string>(user.user_metadata.name as string);

  return (
    <form
      className="flex h-full justify-center overflow-auto bg-default-50 px-[80px] py-[120px]"
      onSubmit={async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (email?.trim() === "" || name?.trim() === "") return;
        await supabaseClient.auth.updateUser({
          email,
          data: { name },
        });
        setIsLoading(false);
        toast.success("Profile Updated");
        await router.push("/profile");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          type="submit"
          isLoading={isLoading}
        >
          Save Changes{" "}
        </Button>
      </div>
    </form>
  );
}

EditPage.getLayout = (page: React.ReactElement) => {
  return <Layout>{page}</Layout>;
};
