import { Card, CardBody } from "@nextui-org/react";
import { type Snips } from "@prisma/client";
import Link from "next/link";

interface SnipCardProps {
  snip: Snips;
}

export default function SnipCard({ snip }: SnipCardProps) {
  return (
    <Card
      className="h-100 max-w-xs p-3"
      isPressable
      as={Link}
      href={`/s/${snip.slug}`}
    >
      <CardBody className=" flex flex-col gap-3">
        <h4 className="text-2xl">
          {/* <span className="spanTitleStyle ">Title:</span> */}
          <span>{snip.title}</span>
        </h4>
        <p className="text-xl">
          {/* <span className="spanTitleStyle">Language:</span> */}
          <span className=" text-slate-200">{snip.language}</span>
        </p>
        <p>
          {/* <span className="spanTitleStyle">Visibility:</span> */}
          <span className="spanCatStyle text-slate-200">{snip.visibility}</span>
        </p>
      </CardBody>
    </Card>
  );
}
