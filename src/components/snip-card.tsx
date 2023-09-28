import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface SnipCardProps {
  snip: {
    title: string;
    language: string;
    visibility: string;
  };
}

export default function SnipCard({ snip }: SnipCardProps) {
  return (
    <Card className="h-100 max-w-xs p-3">
      <CardBody className="flex flex-col gap-3">
        <h4 className="text-2xl">
          <span className="spanTitleStyle ">Title:</span>
          <span className="spanCatStyle">{snip.title}</span>
        </h4>
        <p className="text-xl">
          <span className="spanTitleStyle">Language:</span>
          <span className="spanCatStyle">{snip.language}</span>
        </p>
        <p>
          <span className="spanTitleStyle">Visibility:</span>
          <span className="spanCatStyle">{snip.visibility}</span>
        </p>
      </CardBody>
    </Card>
  );
}
