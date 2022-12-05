import { Button, Text, DefaultMantineColor, MantineSize } from "@mantine/core";
import Link from "next/link";
import { UrlObject } from "url";

declare type Url = string | UrlObject;

type ButtonProps = {
  href: Url;
  color?: DefaultMantineColor | undefined;
  size?: MantineSize | undefined;
  title: string;
};

const buttonStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#8a9af3",
  borderRadius: 10,
  borderWidth: 2,
  borderColor: "#000000",
  borderStyle: "solid",
  margin: 3,
};

const NextButton = (props: ButtonProps) => (
  <Link href={props.href} passHref>
    <Button
      style={buttonStyle}
      component="a"
      color={props.color}
      size={props.size}
    >
      {
        <Text size="md" color="000000" weight="bold">
          {props.title}
        </Text>
      }
    </Button>
  </Link>
);

export default NextButton;
