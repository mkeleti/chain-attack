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
      const style = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F3D2C1",
        width: 110,
        height: 85,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#000000",
        borderStyle: "solid",
      };

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
          {/* <div className="jello" style={style} key={data.hash}>
            <span style={{ fontWeight: "bold" }}>{data.number}</span>
          </div> */}
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
