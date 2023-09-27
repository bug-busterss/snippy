import React from "react";

import { Select, SelectItem, type Selection } from "@nextui-org/react";
import { VisilityOptions, VisilityOptionsAuth } from "./data";
import { useUser } from "@supabase/auth-helpers-react";

interface MultiSelectProps extends React.ComponentPropsWithoutRef<"div"> {
  label: string;
  selected: Selection;
  setValues: React.Dispatch<React.SetStateAction<Selection>>;
  options: { label: string; value: string; checked?: boolean }[];
}

export default function MultiSelect({
  label,
  selected,
  setValues,
}: MultiSelectProps) {
  // const [selected, setValues] = React.useState<Selection>(
  //   new Set(["cat", "dog"]),
  // );
  const user = useUser();

  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        label={label}
        selectionMode="single"
        placeholder="Select a Visibility"
        selectedKeys={selected}
        className="w-full"
        onSelectionChange={setValues}
      >
        {!user
          ? VisilityOptionsAuth.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })
          : VisilityOptions.map((option) => {
              return (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              );
            })}
      </Select>
    </div>
  );
}
