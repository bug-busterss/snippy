import { Image } from "@nextui-org/react";
import { useUser } from "@supabase/auth-helpers-react";
export default function UserProfile() {
  const user = useUser();
  return (
    <>
      <div className="flex flex-col items-center justify-center pt-6">
        <Image
          width={100}
          height={100}
          src="https://imgs.search.brave.com/z-3_VMVbo5k1c4nYN-MGQSo7jUle-HYqNAS5ED1Soag/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9kMnFw/MHNpb3RsYTc0Ni5j/bG91ZGZyb250Lm5l/dC9pbWcvdXNlLWNh/c2VzL3Byb2ZpbGUt/cGljdHVyZS90ZW1w/bGF0ZV8wLmpwZw"
          alt="User Img"
          className="mb-3 rounded-full"
        />
        <h3 className="text-2xl"> {user && user.user_metadata.name}</h3>

        <p className="mb-2 text-gray-400">@{user && user.id}</p>

        <p className=" border border-gray-400"></p>
      </div>

      <div className="flex items-center justify-center gap-6  ">
        <p className="active:underline">Created</p>
        <p className="active:underline">Saved</p>
      </div>
    </>
  );
}
