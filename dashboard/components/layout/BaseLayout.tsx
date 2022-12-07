import { AppShell } from "@mantine/core";
import type { FC, ReactNode } from "react";
import { Legend } from "../simulation/Legend";
import { Sidebar } from "./navigation/Sidebar";

interface Props {
  children: ReactNode;
}

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <AppShell aside={<Sidebar />}>
      {children}
      <Legend />
    </AppShell>
  );
};

export default BaseLayout;
