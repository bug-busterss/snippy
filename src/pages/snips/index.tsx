import { useState, type ReactElement, createRef } from "react";
import Layout from "@/components/layout";
import React from "react";
import { Button, Input } from "@nextui-org/react";
import MultiSelect from "@/components/multiselect/multi-select";
import {
  VisilityOptions,
  languages,
  tagsOptions,
} from "@/components/multiselect/data";

const CreateSnips = () => {
  const [visibility, setVisibility] = useState<Selection>(new Set(["public"]));
  const [language, setLanguage] = useState<Selection>();
  const [tags, setTags] = useState<Selection>();
  const [title, setTitle] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [content, setContent] = useState<string>("");

  return (
    <main className="flex h-full w-full flex-col gap-4 bg-background p-8">
      <Input
        type="text"
        label="Snip Title"
        defaultValue={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setSlug(e.target.value.toLowerCase().replace(/\s/g, "-"));
        }}
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
          values={language}
          className="w-2/4"
          options={languages}
        />
        <MultiSelect
          label={"Tags"}
          setValues={setTags}
          values={tags}
          options={tagsOptions}
          className="w-2/4"
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
      <TextArea />
      <div className="flex w-full gap-2">
        <Button>Save</Button>
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
