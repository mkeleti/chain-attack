import { Center } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { Blockchain } from "../components";

interface Props {
  nodes: number;
}

const Home: NextPage = ({ nodes }: Props) => {
  return (
    <>
      <Head>
        <title>Ethereum Attack</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Center mt={20}>
        <Blockchain nodes={nodes} />
      </Center>
    </>
  );
};

export async function getServerSideProps() {
  const nodes = await (await fetch("http://localhost/nodes")).json();

  return {
    props: {
      nodes: nodes,
    },
  };
}

export default Home;
