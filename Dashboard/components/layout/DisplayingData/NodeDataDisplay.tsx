import { useEffect, useState } from 'react';
import {Group, Text, Box, DefaultMantineColor, MantineSize  } from '@mantine/core';
import NextButton from './NextButton';
import type { FC } from "react";
import { BlockHeader } from "web3-eth";

interface propTypes {
    data: BlockHeader;
  }

export const NodeDataDisplay: FC<any> = (props: propTypes) => {
    return(
        <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 300,
                margin: 30,
                height: 150,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: "#dee2e6",
                borderStyle: "solid",
                backgroundColor: "#fff",
                boxShadow:
                "0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
                }}
        >
        {<div>where the console logs will go</div>}
        </Box>
    );
}