import { useEffect, useState } from 'react';
import {Group, Text, Box, DefaultMantineColor, MantineSize  } from '@mantine/core';
import NextButton from './NextButton';
import type { FC } from "react";
import { Color } from 'p5';


interface propTypes {
    transactions: "",
    blocks: "";
  }

export const TransactionsAndBlockData: FC<any> = (props: propTypes) => {

   

    return(
        <div style={{ display: "flex", 
                    flexDirection: "row", 
                    justifyContent: "center",
                     alignItems: "center"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 170,
                    height: 100,
                    margin: 15,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#000000",
                    borderStyle: "solid",
                    backgroundColor: "#d1efdf" ,
                    boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
                    }}
            >
                <Text size="md" color="000000" weight="bold">Transactions: </Text>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 170,
                    height: 100,
                    margin: 15,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#000000",
                    borderStyle: "solid",
                    backgroundColor: "#d1efdf" ,
                    boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
                    }}
            >
                <Text size="md" color="FFFFFF" weight="bold">Blocks: </Text>
            
            </Box>
        </div>
    );
}