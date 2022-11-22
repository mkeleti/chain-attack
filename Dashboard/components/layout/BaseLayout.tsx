import { AppShell, Button, Menu } from "@mantine/core";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <AppShell
      header={
        <Menu
          shadow="md"
          width={200}
          transition="rotate-right"
          transitionDuration={150}
        >
          <Menu.Target>
            <Button sx={{ margin: 15 }}>Menu</Button>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Link href="/">
              <Menu.Item>Visualizer</Menu.Item>
            </Link>
            <Link href="/blockscout">
              <Menu.Item>Blockscout</Menu.Item>
            </Link>
            <Menu.Divider />
            <Link href="/attack">
              <Menu.Item color="red">Attack</Menu.Item>
            </Link>
          </Menu.Dropdown>
        </Menu>
      }
    >
      <main>{children}</main>
    </AppShell>
  );
};
