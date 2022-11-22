import { Button, Menu } from "@mantine/core";
import Link from "next/link";

export const Header = () => {
  return (
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
  );
};
