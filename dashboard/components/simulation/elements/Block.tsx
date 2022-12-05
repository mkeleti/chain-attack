import { Box, Group, HoverCard, Text } from "@mantine/core";
import { motion } from "framer-motion";
import type { FC } from "react";

type Props = {
  block: any;
  index: number;
};

export const Block: FC<Props> = ({ block, index }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {index > 0 && (
        <motion.svg id={`line-${index}`} width="110" height="55">
          <motion.line
            x1="55"
            y1="0"
            x2="55"
            y2="55"
            stroke="#dee2e6"
            strokeWidth="1"
            initial={{
              pathLength: 0,
            }}
            animate={{
              pathLength: 1,
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          ></motion.line>
        </motion.svg>
      )}
      <HoverCard>
        <HoverCard.Target>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            drag
            whileDrag={{ scale: 1.2 }}
            dragSnapToOrigin
          >
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
                cursor: "pointer",
              }}
            >
              <Text size="sm" weight="bold">
                {block.number}
              </Text>
            </Box>
          </motion.div>
        </HoverCard.Target>
        <HoverCard.Dropdown>
          <Group>
            <Text size="sm" weight="bold">
              Blockscout
            </Text>
          </Group>
          <Text size="xs" mt="md" color="">
            <b>Hash:</b> {block.hash}
          </Text>
          <Text size="xs" mt="md" color="">
            <b>Time:</b> {formatTime(block.timestamp)}
          </Text>
        </HoverCard.Dropdown>
      </HoverCard>
    </div>
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
