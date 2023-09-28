import Layout from "@/components/layout";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { type ReactElement } from "react";
import dayjs from "dayjs";
import { xcodeDark } from "@uiw/codemirror-theme-xcode";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import { Chip } from "@nextui-org/react";
import { type GetServerSidePropsContext } from "next";
import { db } from "@/server/db";
import { Dot } from "lucide-react";

export default function SnipDisplay() {
  const router = useRouter();
  const { data: snip, error } = api.snip.getOne.useQuery({
    slug: router.query.slug as string,
  });

  return (
    <div>
      <div className="container mx-auto">
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

            <div>
              <h1 className="text-3xl font-medium">Comments</h1>
              <div className="flex flex-col gap-2">
                {snip.comments.map((comment) => (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <img
                        src={comment.user.avatar}
                        alt="avatar"
                        className="h-8 w-8 rounded-full"
                      />
                      <div className="flex flex-col gap-1">
                        <h3 className="text-xl font-medium">
                          {comment.user.username}
                        </h3>
                        <h4 className="text-lg">{comment.content}</h4>
                      </div>
                    </div>
                    <h5 className="text-sm text-gray-500">
                      {dayjs(comment.createdAt).format("D MMM YYYY")}
                    </h5>
                  </div>
                ))}
              </div>
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
