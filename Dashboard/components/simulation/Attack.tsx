import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { Subscription } from "../../web3/newHeads";
import Block from "./elements/Block";
import Node from "./elements/Node";

interface PropTypes {
  hashes?: string[];
  nodes?: string[];
}

export const Attack = ({ nodes }: PropTypes) => {
  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
    Subscription.on("data", (block) => {
      setBlocks([block, ...blocks]);
    });

    () => Subscription.unsubscribe();
  }, [blocks]);

  return (
    <>
      <Box>
        {nodes.map((_, i) => (
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

export default Attack;
