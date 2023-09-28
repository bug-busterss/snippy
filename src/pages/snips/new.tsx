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
import { xcodeDark } from "@uiw/codemirror-theme-xcode";
import { useRouter } from "next/router";

const CreateSnips = () => {
  const [visibility, setVisibility] = useState<Selection>(new Set(["public"]));
  const [language, setLanguage] = useState<Selection>(new Set(["javascript"]));
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("Untitled Snip");
  const [slug, setSlug] = useState("");
  const user = useUser();
  const router = useRouter();
  // console.log(user);

  const { mutate: mutateAnon, isLoading: isLoadingAnon } =
    api.snip.createAnon.useMutation({
      onSuccess: async (data) => {
        toast.success("Snip Created");
        await router.push(`/s/${data.slug}`);
      },

      onError: (error) => {
        console.log(error);
        toast.error(error.message);
      },
    });
  const { mutate, isLoading } = api.protectedSnip.create.useMutation({
    onSuccess: async (data) => {
      console.log(data);
      toast.success("Snip Created");
      if (data.slug !== "new") {
        await router.push(`/s/${data.slug}`);
      }
    },

    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });
  function handleSaveAnon() {
    const newLanguage = Array.from(language)[0] as string;
    const newVisibility = Array.from(visibility)[0] as Visibility;
    mutateAnon({
      title,
      code,
      language: newLanguage,
      visibility: newVisibility,
    });
  }
  function handleSave() {
    const newLanguage = Array.from(language)[0] as string;
    const newVisibility = Array.from(visibility)[0] as Visibility;
    mutate({
      title,
      code,
      language: newLanguage,
      visibility: newVisibility,
      slug,
    });
  }

  return (
    <main className="flex h-full w-full flex-col gap-4 bg-background p-8">
      <Input
        type="text"
        defaultValue={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
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
        theme={xcodeDark}
        className="text-xl"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        extensions={[loadLanguage(Array.from(language)[0])]}
        onChange={(e) => {
          setCode(e);
        }}
      />
      <div className="flex w-full justify-end gap-2">
        {user && (
          <Button onPress={handleSave} color="primary" isLoading={isLoading}>
            Save
          </Button>
        )}
        <Button
          onPress={handleSaveAnon}
          color={user ? "secondary" : "primary"}
          isLoading={isLoadingAnon}
        >
          {user ? "Save Anonymously" : "Save"}
        </Button>
      </div>
    </main>
  );
};

CreateSnips.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default CreateSnips;
