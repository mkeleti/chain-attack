import type { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import AnimeChain from "../components/AnimatedChain";
import { Box, Center } from "@mantine/core";
import Script from "next/script";

const Home: NextPage = () => {
  const [nodes, setNodes] = useState([
    " ",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [blocknumber, setBlocknumber] = useState([]);

  //let subscription = web3.eth.subscribe(
  //  "newBlockHeaders",
   // function (error, results) {
    //  console.log(results);
  //  }
 // );

  return (
    <div>
      <Head>
        <title>Ethereum Attack</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box mt={60}>
        <Center>
          {" "}
          <AnimeChain hashes={blocknumber} nodes={nodes} />
        </Center>
        </Box>
      </main>
    </div>
  );
};

export default Home;