import { Box } from "@mantine/core";
import { useEffect, useState } from "react";
import { Subscription } from "../../web3/newHeads";
import Block from "./elements/Block";

interface PropTypes {
  hashes: string[];
  nodes: string[];
}
export const Blockchain = ({ nodes }: PropTypes) => {
  const [blocks, setBlocks] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    Subscription.on("data", (data) => {
      const block = (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {index > 0 && (
            <svg width="100" height="55">
              <line
                x1="55"
                y1="0"
                x2="55"
                y2="55"
                stroke="black"
                stroke-width="2"
              ></line>
            </svg>
          )}
          <Block key={data.hash} data={data}></Block>
        </div>
      );

      setIndex(index + 1);
      setBlocks([...blocks, block]);
    });
    return () => {};
  });

  return <Box>{blocks}</Box>;
};
