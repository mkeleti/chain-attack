// Index
import { Center } from "@mantine/core";
import type { NextPage } from "next";
import Head from "next/head";
import { Blockchain } from "../components";
import Dockerode from "dockerode";

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
      <Center>
        <Blockchain nodes={nodes} />
      </Center>
    </>
  );
};

export async function getServerSideProps() {
  const docker = new Dockerode();

  let nodeCount = 0;
  for (const container of await docker.listContainers()) {
    if (container.Image.includes("geth")) {
      nodeCount++;
      console.log(container);
    }
  }

  return {
    props: {
      nodes: nodeCount,
    },
  };
}

export default Home;
