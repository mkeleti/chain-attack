import {
  Box,
  Group,
  HoverCard,
  Text,
} from "@mantine/core";
import type { FC } from "react";
import { BlockHeader } from "web3-eth";

interface propTypes {
  data: BlockHeader
}

const Block: FC<any> = ( props: propTypes ) => {
  console.log(props.data);
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
          {props.data.number}
        </Box>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Group>
          <Text size="sm" weight="bold">
            Block #{props.data.number}
          </Text>
        </Group>
        <Text size="xs" mt="md" color="">
          <b>Hash:</b> {props.data.hash}
        </Text>
        <Text size="xs" mt="md" color="">
          <b>Time:</b> {formatTime(props.data.timestamp)}
        </Text>
        <Text size="xs" mt="md" color="">
          <b>Gas Used:</b> {props.data.gasUsed}
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
