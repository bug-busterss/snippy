import Layout from "@/components/layout";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { type ReactElement } from "react";

export default function SnipDisplay() {
  const router = useRouter();
  const { data: snip } = api.snip.getOne.useQuery({
    slug: router.query.slug as string,
  });
  return (
    <div>
      {snip && (
        <div>
          <h1>
            {snip.updatedAt.toDateString()}{" "}
            {snip.updatedAt > snip.createdAt ? "EDITED" : ""}
          </h1>
        </div>
      )}
    </div>
  );
}

SnipDisplay.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;
