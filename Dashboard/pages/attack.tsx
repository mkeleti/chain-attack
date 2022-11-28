import { Box, Center, Group } from "@mantine/core";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import NextButton from "../components/layout/navigation/NextButton";
import { listAll } from "../app/dockerode";

export async function GetServerSideProps() {
  const list = listAll();
  return {
    list,
  }
}

const Attack: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Attack</title>
      </Head>
      <main>
        <Box mt={60}>
          <Center>
            <Group mt={25}>
              <NextButton href="/" title="51% Attack" color="red" size="xl" />
              <NextButton href="/" title="DAO Attack" color="red" size="xl" />
            </Group>
          </Center>
        </Box>
      </main>
    </div>
  );
};

export default Attack;
