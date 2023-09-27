import { useState, type ReactElement, createRef } from "react";
import Layout from "@/components/layout";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import type { Selection } from "@nextui-org/react";
import MultiSelect from "@/components/multiselect/multi-select";
import {
  VisilityOptions,
  languages,
  tagsOptions,
} from "@/components/multiselect/data";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { api } from "@/utils/api";

const CreateSnips = () => {
  const [visibility, setVisibility] = useState<Selection>(new Set(["public"]));
  const [language, setLanguage] = useState<Selection>(new Set(["javascript"]));
  const [tags, setTags] = useState<Selection>(new Set([]));
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");

  // const { mutate } = api.snip.create.useMutation({
  //   onSuccess: (data) => {
  //     console.log(data);
  //   },
  // });
  function handleSave() {
    const newLanguage = Array.from(language)[0] as string;
    const newVisibility = Array.from(visibility)[0] as string;
    // mutate({
    //   title,
    //   code,
    //   language: newLanguage,
    //   visibility: newVisibility,
    //   slug,
    // });
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
        theme={"light"}
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

  function TextArea() {
    const [lines, setLines] = useState<number[]>([1]);
    const [scrollPos, setScrollPos] = useState<number>(0);
    const linesComp: React.Ref<HTMLDivElement> = createRef();
    function handleTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
      console.log(e.target.value.split("\n").length);
      setLines([...lines, e.target.value.split("\n").length]);
    }
    function handleScroll(e: React.UIEvent<HTMLTextAreaElement>) {
      console.log(e.currentTarget.scrollTop);
      if (linesComp) {
        if (linesComp) return;
      }
    }

    return (
      <div className="w-full">
        <div
          className="absolute left-12 top-[22rem] h-[19rem] overflow-scroll scrollbar-hide "
          ref={linesComp}
        >
          {lines.map((line, key) => (
            <div key={key}>{line}</div>
          ))}
        </div>
        <textarea
          onScrollCapture={handleScroll}
          onChange={handleTextChange}
          className={`h-80 w-full overflow-auto rounded-lg bg-default-100 p-4 outline-none hover:bg-default-200 focus:bg-default-100 ${
            lines.length < 10 ? "pl-9" : "pl-12"
          }`}
        />
      </div>
    );
  }
};

export default CreateSnips;

CreateSnips.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
