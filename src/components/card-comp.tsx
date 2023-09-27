import { Card, CardBody } from "@nextui-org/react";
import React from "react";

interface cardComponentProps {
  title: string;
  description: string;
  clickHandler?: VoidFunction;
  isBorder?: boolean;
}

export default function CardComponent(props: cardComponentProps) {
  return (
    <Card
      className={`max-w-md bg-gradient-to-b from-[#331b55] to-[#15162c]  p-2 ${
        props.isBorder ? " border-2 border-sky-600" : "border-none"
      } `}
      isPressable
      onPress={props.clickHandler}
    >
      <CardBody>
        <h3 className="mb-4 max-w-md text-2xl font-bold">{props.title}</h3>
        <p className="max-w-md text-lg">{props.description}</p>
      </CardBody>
    </Card>
  );
}
