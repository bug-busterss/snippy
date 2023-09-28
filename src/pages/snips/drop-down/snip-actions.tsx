import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";
import { useRouter } from "next/router";

interface DropdownProps {
  slugId: string;
}

export default function SnipActions({ slugId }) {
  const [value, copy] = useCopyToClipboard();
  const ctx = api.useContext();

  const { mutate } = api.protectedSnip.DeleteOne.useMutation({
    onSuccess: (data) => {
      void ctx.protectedSnip.mySnips.invalidate();
      console.log(data);
      toast.success("Snip Deleted");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  const router = useRouter();
  function handleDelete() {
    console.log("logout");
    mutate({ slugId });
    void router.push("/profile");
  }
  return (
    <Dropdown>
      <DropdownTrigger>
        <MoreVertical />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          onClick={() => {
            void router.push("/snips/new");
          }}
          key="new"
        >
          New Snip
        </DropdownItem>
        <DropdownItem
          onClick={() => {
            void router.push(`/snips/edit/${slugId}`);
          }}
          key="edit"
        >
          Edit file
        </DropdownItem>
        <DropdownItem onClick={() => copy(window.location.href)} key="copy">
          Share Snip
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={handleDelete}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
