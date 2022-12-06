import { Drawer, Group, Text, Button, ScrollArea, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import Link from "next/link";
import NextButton from "./NextButton";
import { Color } from "p5";
import { DisplayBox } from "./DisplayBox";

export const DisplayDrawer = () => {
  const [opened, setOpened] = useState(true);

  const buttonStyle = {
    size: "lg",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "violet",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000000",
    borderStyle: "solid",
    margin: 50,
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={containerStyle}>
      <Group position="center">
        <Button sx={buttonStyle} onClick={() => setOpened(true)}>
          <Text size="lg" color="000000" weight="bold">
            View Data
          </Text>
        </Button>
      </Group>

      <ScrollArea style={{ height: 250 }}>
        <Drawer
          size="lg"
          position="right"
          opened={opened}
          onClose={() => setOpened(false)}
          overlayOpacity={0.0}
          style={{ color: "violet" }}
        >
          <Stack>
            <NextButton
              href="/blockscout"
              title="Blockchain Explorer"
              color="#8a9af3"
              size="sm"
            ></NextButton>
            <NextButton
              href="/attack"
              title="Initiate Attack"
              color="#f7d2d2"
              size="sm"
            ></NextButton>
            <NextButton
              href="/"
              title="View Blockchain"
              color="#f7d2d2"
              size="sm"
            ></NextButton>
            <Group>
              <DisplayBox title="Transactions" count={0}></DisplayBox>
              <DisplayBox title="Blocks" count={0}></DisplayBox>
            </Group>
          </Stack>
        </Drawer>
      </ScrollArea>
    </div>
  );
};
