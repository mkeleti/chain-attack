import {
  Anchor,
  Avatar,
  Box,
  Group,
  HoverCard,
  Stack,
  Text,
} from "@mantine/core";
import type { FC } from "react";

type Props = {
  data: any;
};

const Block: FC<any> = ({ data }) => {
  console.log({ data });
  return (
    <HoverCard>
      <HoverCard.Target>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 110,
            height: 85,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#dee2e6",
            borderStyle: "solid",
            backgroundColor: "#fff",
            boxShadow:
              "0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
          }}
        >
          {data.number}
        </Box>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Group>
          <Text size="sm" weight="bold">
            Blockscout
          </Text>
        </Group>
        <Text size="xs" mt="md" color="">
          <b>Hash:</b> {data.hash}
        </Text>
        <Text size="xs" mt="md" color="">
          <b>Time:</b> {formatTime(data.timestamp)}
        </Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

function formatTime(s) {
  const dtFormat = new Intl.DateTimeFormat("en-GB", {
    timeStyle: "medium",
    timeZone: "UTC",
  });

  return dtFormat.format(new Date(s * 1e3));
}

export default Block;
