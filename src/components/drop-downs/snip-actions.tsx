import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import {
  MoreHorizontal,
  FilePlus,
  FileEdit,
  Share,
  Trash2,
} from "lucide-react";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

interface DropdownProps {
  slugId: string;
}

export default function SnipActions({ slugId }: DropdownProps) {
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
    <Dropdown backdrop="blur">
      <DropdownTrigger>
        <Button className="bg-transparent" color="default">
          <MoreHorizontal />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          startContent={<FilePlus />}
          onClick={() => void router.push("/snips/new")}
          key="new"
        >
          New Snip
        </DropdownItem>
        <DropdownItem
          startContent={<FileEdit />}
          onClick={() => void router.push(`/snips/edit/${slugId}`)}
          key="edit"
        >
          Edit Snip
        </DropdownItem>
        <DropdownItem
          startContent={<Share />}
          onClick={() => navigator.share({ url: window.location.href })}
          key="copy"
        >
          Share Snip
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger"
          color="danger"
          onClick={handleDelete}
          startContent={<Trash2 />}
        >
          Delete Snip
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
