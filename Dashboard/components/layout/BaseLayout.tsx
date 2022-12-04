import { AppShell } from "@mantine/core";
import type { FC, ReactNode } from "react";
import { Header } from "./navigation/Header";
import { DataDrawer } from "./navigation/Drawer";
import { MantineProvider } from "@mantine/core";

interface Props {
  children: ReactNode;
}

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
      <AppShell styles={{ main: { padding: 0 } }} header={<Header />} drawer={<DataDrawer />}>
        <main>{children}</main>
        <DataDrawer/>
      </AppShell>
  );
};

export default BaseLayout;
