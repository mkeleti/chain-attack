import { Aside, Button, ScrollArea, Stack, Divider, Tabs } from "@mantine/core";

import Link from "next/link";
import { MinerLog } from "../MinerLog";

export const Sidebar = () => {
  return (
    <ScrollArea style={{ height: 250 }}>
      <Aside p="md" width={{ lg: 405 }}>
        <Stack>
          <Link href="/blockscout">
            <Button fullWidth variant="light" color="blue">
              Blockchain Explorer
            </Button>
          </Link>
          <Link href="/attack">
            <Button fullWidth variant="light" color="red">
              Start Attack
            </Button>
          </Link>
          <Link href="/">
            <Button fullWidth variant="light" color="teal">
              View the Chain
            </Button>
          </Link>
          <Divider my="xxs" />
          <Tabs defaultValue="miner01">
            <Tabs.List grow>
              <Tabs.Tab value="miner01">Miner 1</Tabs.Tab>
              <Tabs.Tab value="miner02">Miner 2</Tabs.Tab>
              <Tabs.Tab value="miner03">Miner 3</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="miner01" pt="xs">
              <MinerLog source="http://localhost/logs/0" />
            </Tabs.Panel>
            <Tabs.Panel value="miner02" pt="xs">
              <MinerLog source="http://localhost/logs/1" />
            </Tabs.Panel>
            <Tabs.Panel value="miner03" pt="xs">
              <MinerLog source="http://localhost/logs/2" />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Aside>
    </ScrollArea>
  );
};
