import Layout from "@/components/layout";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { type ReactElement } from "react";
import dayjs from "dayjs";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { Chip } from "@nextui-org/react";
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from "next";
import { db } from "@/server/db";
import { Dot } from "lucide-react";
import SnipActions from "../../components/drop-downs/snip-actions";

export default function SnipDisplay(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const router = useRouter();
  const {
    data: snip,
    error,
    isLoading,
  } = api.snip.getOne.useQuery({
    slug: router.query.slug as string,
  });

  return (
    <div>
      <div className="container mx-auto">
        {isLoading && (
          <h1 className="text-center text-3xl font-medium">Loading...</h1>
        )}
        {error && (
          <h1 className="text-center text-3xl font-medium">{error.message}</h1>
        )}
        {snip && (
          <>
            <div className="flex flex-col items-center justify-center gap-3">
              <h1 className="text-3xl font-medium">{snip.title}</h1>
              <h3 className="text-xl">
                Created: {dayjs(snip.createdAt).format("D MMM YYYY")}
              </h3>
              {snip.updatedAt > snip.createdAt && (
                <h3 className="text-xl">
                  Updated: {dayjs(snip.updatedAt).format("D MMM YYYY")}
                </h3>
              )}
              <div className="flex items-center">
                <Chip color="warning" variant="flat">
                  {snip.language}
                </Chip>
                <Dot />
                <Chip color="secondary">{snip.views} views</Chip>
              </div>
            </div>
            <div className="relative">
              <div className="absolute right-5 top-2">
                <SnipActions slugId={snip.id} />
              </div>
              <CodeMirror
                value={snip.content}
                height="384px"
                theme={xcodeDark}
                className="mt-5 text-xl"
                editable={false}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                extensions={[loadLanguage(snip.language)]}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

SnipDisplay.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const slug = ctx.params?.slug as string;

  await db.snips.update({ where: { slug }, data: { views: { increment: 1 } } });

  return { props: {} };
}
