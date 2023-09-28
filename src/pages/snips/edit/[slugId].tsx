import { useState, type ReactElement, useEffect } from "react";
import Layout from "@/components/layout";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import MultiSelect from "@/components/multiselect/multi-select";
import { VisilityOptions } from "@/components/multiselect/data";
import CodeMirror from "@uiw/react-codemirror";
import { loadLanguage, langNames } from "@uiw/codemirror-extensions-langs";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { type Visibility } from "@prisma/client";
import { useUser } from "@supabase/auth-helpers-react";
import VisibilitySelect from "@/components/multiselect/visibiltySelect";
import {
  removeConsecutiveHypens,
  removeConsecutiveSpaces,
} from "@/utils/functions";
import { useRouter } from "next/router";

function EditSnips(props) {
  const [visibility, setVisibility] = useState<Selection>(new Set(["public"]));
  const [language, setLanguage] = useState<Selection>(new Set(["javascript"]));
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("Untitled Snip");
  const [slug, setSlug] = useState("");
  const user = useUser();
  const router = useRouter();

  const { slugId } = router.query;
  const data = api.protectedSnip.getOneID.useQuery({
    slugId: slugId as string,
  });
  useEffect(() => {
    if (!data.data) {
      return;
    }
    setCode(data.data.content);
    setTitle(data.data.title);
    setSlug(data.data.slug);
    setLanguage(new Set([data.data.language]));
    setVisibility(new Set([data.data.visibility]));
  }, [data.data]);

  const { mutate } = api.protectedSnip.update.useMutation({
    onSuccess: (data) => {
      console.log(data);
      toast.success("Snip Created");
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  function handleSave() {
    const newLanguage = Array.from(language)[0] as string;
    const newVisibility = Array.from(visibility)[0] as Visibility;
    if (data.data?.id) {
      mutate({
        id: data.data?.id,
        title,
        code,
        language: newLanguage,
        visibility: newVisibility,
        slug,
      });
    }
  }

  return (
    <main className="flex h-full w-full flex-col gap-4 bg-background p-8">
      <Input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          let jod = removeConsecutiveSpaces(e.target.value).toLowerCase();
          jod = removeConsecutiveHypens(e.target.value);
          setSlug(jod.replace(/[-\s]+/g, "-"));
        }}
        label="Snip Title"
        radius="md"
      />
      <div className="flex w-full gap-4">
        <VisibilitySelect
          selected={visibility}
          setValues={setVisibility}
          options={VisilityOptions}
          label={"Visibility"}
          className="w-2/4"
        />
        <MultiSelect
          setValues={setLanguage}
          label={"Language"}
          selected={language}
          className="w-2/4"
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          options={langNames.map((l) => ({ label: l, value: l }))}
        />
      </div>
      {user && (
        <Input
          type="text"
          value={slug}
          defaultValue={slug}
          onChange={(e) => {
            setSlug(e.target.value);
          }}
          label="Slug"
          radius="md"
        />
      )}
      <CodeMirror
        value={code}
        height="384px"
        theme={"dark"}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        extensions={[loadLanguage(Array.from(language)[0])]}
        onChange={(e) => {
          setCode(e);
        }}
      />
      <div className="flex w-full gap-2">
        {user && <Button onClick={handleSave}>Update</Button>}
      </div>
    </main>
  );
}

export default EditSnips;

EditSnips.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
