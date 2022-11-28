import { AppShell } from "@mantine/core";
import type { FC, ReactNode } from "react";
import { Header } from "./navigation/Header";
import { MantineProvider } from '@mantine/core';


interface Props {
  children: ReactNode;
}

export const BaseLayout: FC<Props> = ({ children }) => {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <AppShell styles={{ main: { padding: 0 } }} header={<Header />}>
       <main>{children}</main>
      </AppShell>
    </MantineProvider>
  );
};

export default BaseLayout;
