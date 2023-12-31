import Layout from "@/components/layout";
import SnipCard from "@/components/snip-card";
import { api } from "@/utils/api";
import { Image } from "@nextui-org/react";
import { useUser } from "@supabase/auth-helpers-react";
import { type ReactElement } from "react";

export default function UserProfile() {
  const { data: snips } = api.protectedSnip.mySnips.useQuery();
  const user = useUser();

  return (
    <div className="h-full bg-default-50">
      <div className="flex flex-col items-center justify-center gap-6 pt-6">
        <Image
          width={100}
          height={100}
          src="https://imgs.search.brave.com/z-3_VMVbo5k1c4nYN-MGQSo7jUle-HYqNAS5ED1Soag/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8wLmpwZw"
          alt="User Img"
          className="rounded-full"
        />
        <div className="gap-2 text-center">
          <h3 className="text-2xl"> {user?.user_metadata.name}</h3>

          <p className="mt-2 text-gray-400">@{user?.id}</p>
        </div>

        <div className="mx-auto flex flex-wrap justify-center gap-6">
          {snips?.map((snip, key) => <SnipCard snip={snip} key={key} />)}
        </div>
      </div>
    </div>
  );
}

UserProfile.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
