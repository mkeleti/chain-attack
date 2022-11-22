import { AppShell } from "@mantine/core";
import type { FC, ReactNode } from "react";
import { Header } from "./navigation/Header";

interface Props {
  children: ReactNode;
}

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <AppShell header={<Header />}>
      <main>{children}</main>
    </AppShell>
  );
};
