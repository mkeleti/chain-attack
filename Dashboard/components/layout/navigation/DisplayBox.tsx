import { Box, Text } from "@mantine/core";
import type { FC } from "react";

type boxProps = {
  count: number;
  title: string;
};

export const DisplayBox: FC<boxProps> = ({ count, title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 140,
        height: 50,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#000000",
        borderStyle: "solid",
        backgroundColor: "#fff",
        margin: 8,
        padding: 4,
      }}
    >
      {
        <>
          <Text size="xs" weight="bold">
            {title + ":"}
            &nbsp;
          </Text>
          <Text size="xs" weight="bold">
            {count}
          </Text>
        </>
      }
    </Box>
  );
};
