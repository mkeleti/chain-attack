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
        <div 
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 100,
                    height: 100,
                    margin: 30,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#000000",
                    borderStyle: "solid",
                    backgroundColor: "#d1efdf" ,
                    boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
                    }}
            >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 100,
                    height: 100,
                    margin: 30,
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: "#000000",
                    borderStyle: "solid",
                    backgroundColor: "#d1efdf" ,
                    boxShadow:
                    "0 1px 3px rgba(0, 0, 0, 0.05),rgba(0, 0, 0, 0.05) 0px 20px 25px -5px,rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
                    }}
            ></Box>
            {
                <>
                    <Text size="xl" color="000000" weight="bold">Chain Status: </Text>
                    <Text size="lg" color="FFFFFF" weight="bold">data</Text>
                </>
            }
            </Box>
        </div>
    );
}