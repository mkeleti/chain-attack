import { Box } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Iframe from "react-iframe";

const Blockscout: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blockscout</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Box mt={60}>
        <Iframe
          url="http://localhost:4000"
          width="100%"
          height="1200px"
          id="Blockscout"
          loading="auto"
          className="Blockscout"
          display="block"
          position="relative"
        />
        </Box>
      </main>
    </div>
  );
};

export default Blockscout;