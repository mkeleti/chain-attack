import { AppShell } from "@mantine/core";
import type { FC, ReactNode } from "react";
import { Legend } from "./Legend";
import { DisplayDrawer } from "./navigation/Drawer";

interface Props {
  children: ReactNode;
}

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <AppShell aside={<DisplayDrawer />}>
      {children}
      <Legend />
    </AppShell>
  );
};

export default BaseLayout;
