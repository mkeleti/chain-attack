import { useEffect, useState } from "react";
import { Subscription } from "../../web3/newHeads";
import Block from "./elements/Block";
import { Box, Stack, Center } from "@mantine/core";
import { NodeCluster } from "./elements/NodeCluster";

interface PropTypes {
  hashes?: string[];
  nodes?: number;
}

export const Blockchain = ({ nodes }: PropTypes) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    Subscription.on("data", (block) => {
      setBlocks([block, ...blocks]);
    });

    return () => {
      Subscription.unsubscribe();
    };
  });

  return (
    <Stack spacing="xs">
      <Box style={{ height: 250, width: 355 }}>
        <NodeCluster nodes={nodes} />
      </Box>
      <Center>
        <Box>
          {blocks.map((block, index) => (
            <Block key={index} index={index} block={block} />
          ))}
        </Box>
      </Center>
    </Stack>
  );
};

export default Blockchain;
