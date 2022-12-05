import { Aside, Button, ScrollArea, Stack } from "@mantine/core";

import Link from "next/link";

export const Sidebar = () => {
  return (
    <ScrollArea style={{ height: 250 }}>
      <Aside p="md" width={{ lg: 300 }}>
        <Stack>
          <Link href="">
            <Button>Blockchain Explorer</Button>
          </Link>
          <Link href="">
            <Button>Start Attack</Button>
          </Link>
          <Link href="">
            <Button>View the Chain</Button>
          </Link>
        </Stack>
      </Aside>
    </ScrollArea>
  );
};
