import { useState } from "react";
import { Subscription } from "../../web3/newHeads";
import Block from "./elements/Block";
import Node from "./elements/Node";
import { Box } from "@mantine/core";

interface PropTypes {
  hashes?: string[];
  nodes?: number;
}

export const Blockchain = ({ nodes }: PropTypes) => {
  const [blocks, setBlocks] = useState([]);

  Subscription.on("data", (block) => {
    setBlocks([block, ...blocks]);
  });

  return (
    <>
      <Box>
        {[...Array(nodes)].map((_, i) => (
          <Node key={i} id={i} />
        ))}
      </Box>
      <Box>
        {blocks.map((block, index) => (
          <Block key={index} index={index} block={block} />
        ))}
      </Box>
    </>
  );
};

export default Blockchain;
