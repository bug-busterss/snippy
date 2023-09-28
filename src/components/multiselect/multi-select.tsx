import React from "react";

import { Select, SelectItem, type Selection } from "@nextui-org/react";

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
  options,
}: MultiSelectProps) {
  // const [selected, setValues] = React.useState<Selection>(
  //   new Set(["cat", "dog"]),
  // );

  return (
    <div className="flex w-full flex-col gap-2">
      <Select
        label={label}
        selectionMode="single"
        placeholder="Select an option"
        selectedKeys={selected}
        className="w-full"
        onSelectionChange={setValues}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
