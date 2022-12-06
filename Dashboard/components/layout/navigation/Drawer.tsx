import {
  Drawer,
  Box,
  Group,
  Text,
  Button,
  ScrollArea,
  Stack,
} from "@mantine/core";
import { useEffect, useState } from "react";
import Link from "next/link";
import NextButton from "./NextButton";
import { Color } from "p5";
import { DisplayBox } from "./DisplayBox";
import { Subscription } from "../../../web3/newHeads";

export const DisplayDrawer = () => {
  const [opened, setOpened] = useState(true);
  const [blockCount, setBlockCount] = useState(0);

  const buttonStyle = {
    size: "lg",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "violet",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderStyle: "solid",
    margin: 50,
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  Subscription.on("data", (input) => {
    setBlockCount(input.number);
  });

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
              <DisplayBox
                title="Blocks"
                count={Number(blockCount)}
              ></DisplayBox>
            </Group>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 200,
                height: 100,
                borderRadius: 10,
                borderWidth: 1.5,
                borderColor: "#000000",
                borderStyle: "solid",
                backgroundColor: "#fff",
                margin: 8,
                padding: 4,
              }}
            >
              <Text size="sm" color="000000" weight="bold">
                Chain Status: {}
              </Text>
            </Box>
          </Stack>
        </Drawer>
      </ScrollArea>
    </div>
  );
};
