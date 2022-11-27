import { Box } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import Iframe from "react-iframe";

const Blockscout: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Blockscout</title>
      </Head>
      <main>
        <Box>
          <Iframe
            url={process.env.NEXT_PUBLIC_BLKSCT}
            width="100%"
            height="1200px"
            id="Blockscout"
            loading="auto"
            className="Blockscout"
            display="block"
            position="relative"
            frameBorder={0}
          />
        </Box>
      </main>
    </div>
  );
};

export default Blockscout;
