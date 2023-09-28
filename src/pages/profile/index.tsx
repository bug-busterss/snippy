import Layout from "@/components/layout";
import SnipCard from "@/components/snip-card";
import { Image } from "@nextui-org/react";
import { useUser } from "@supabase/auth-helpers-react";
import { type ReactElement } from "react";

const snips = [
  {
    title: "Snip 1",
    language: "javascript",
    visibility: "public",
  },
  {
    title: "This is a very long snip title",
    language: "java",
    visibility: "private",
  },
  {
    title: "This is a title",
    language: "C",
    visibility: "unlisted",
  },
  {
    title: "Snippet",
    language: "C++",
    visibility: "private",
  },
  {
    title: "This is a very long snip title",
    language: "java",
    visibility: "private",
  },
  {
    title: "Snippet",
    language: "C++",
    visibility: "private",
  },
  {
    title: "Snippet",
    language: "C++",
    visibility: "private",
  },
];

export default function UserProfile() {
  const user = useUser();
  return (
    <div className="h-full bg-black">
      <div className="flex flex-col items-center justify-center gap-6 pt-6">
        <Image
          width={100}
          height={100}
          src="https://imgs.search.brave.com/z-3_VMVbo5k1c4nYN-MGQSo7jUle-HYqNAS5ED1Soag/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8wLmpwZw"
          alt="User Img"
          className=" rounded-full"
        />
        <h3 className="text-2xl"> {user && user.user_metadata.name}</h3>

        <p className=" text-gray-400">@{user && user.id}</p>

        <p className="border border-gray-400"></p>
      </div>

      <div className="flex  flex-wrap justify-center  gap-6">
        {snips.map((snip, key) => (
          <SnipCard snip={snip} key={key} />
        ))}
      </div>
    </div>
  );
}

UserProfile.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
