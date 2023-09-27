import { useState, type ReactElement } from "react";
import Layout from "@/components/layout";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import MultiSelect from "@/components/multiselect/multi-select";
import { VisilityOptions, languages } from "@/components/multiselect/data";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { api } from "@/utils/api";
import toast from "react-hot-toast";

const CreateSnips = () => {
  const [visibility, setVisibility] = useState<Selection>(new Set(["public"]));
  const [language, setLanguage] = useState<Selection>(new Set(["javascript"]));
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("Untitled Snip");
  const [slug, setSlug] = useState<string>("");

  const { mutate } = api.snip.create.useMutation({
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
    const newVisibility = Array.from(visibility)[0] as string;
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
          setSlug(e.target.value.toLowerCase().replace(/\s/g, "-"));
        }}
        label="Snip Title"
        radius="md"
      />
      <div className="flex w-full gap-4">
        <MultiSelect
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
          options={languages}
        />
      </div>
      <Input
        type="text"
        value={slug}
        onChange={(e) => {
          setSlug(e.target.value);
        }}
        label="Slug"
        radius="md"
      />
      <CodeMirror
        value={code}
        height="384px"
        theme={"dark"}
        extensions={[javascript({ jsx: true })]}
        onChange={(e) => {
          setCode(e);
        }}
      />
      {/* <TextArea /> */}
      <div className="flex w-full gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button>Save Anonymously</Button>
      </div>
    </main>
  );
};

export default CreateSnips;

CreateSnips.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
