/* eslint-disable @next/next/no-img-element */
import { Button, useDisclosure } from "@nextui-org/react";
import { useUser } from "@supabase/auth-helpers-react";
import React from "react";

import LoginModal from "../components/modals/login-modal";

export default function NotFoundPage() {
  const user = useUser();
  const loginModal = useDisclosure();
  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-center bg-black">
        <img
          className="mb-6 rounded-xl"
          src="https://imgs.search.brave.com/4456AxXu6O3bsEvXCKxEjJ6Bl4gwoVe8HtCiBQyBFFE/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzk5LzcyLzA5/LzM2MF9GXzQ5OTcy/MDk5NV9zZm1Vb1dv/bTUwa3gyNUNZY09p/WUxWeEJPc3RkYjVq/ai5qcGc"
          alt="spinyy"
          width={250}
        />

        <h1 className="mb-6 text-4xl font-bold">404</h1>

        <p className="mb-6 text-xl">
          {user ? `you logged in as {user.email}` : `you are not logged in`}
        </p>

        <Button onPress={loginModal.onOpen} color="primary" className=" w-56">
          {user ? `Sign in as different user` : `Sign in`}
        </Button>
        <LoginModal {...loginModal} />
      </main>
    </>
  );
}
