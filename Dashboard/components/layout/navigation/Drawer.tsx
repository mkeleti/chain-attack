import { Drawer, Group, Text, Button, ScrollArea, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import Link from "next/link";
import NextButton from "./NextButton";

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
    margin: 30,
  };

  return (
    <div>
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
          overlayOpacity={0.05}
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
          </Stack>
        </Drawer>
      </ScrollArea>
    </div>
  );
};
