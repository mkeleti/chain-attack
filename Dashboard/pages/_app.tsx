/* eslint-disable @next/next/no-sync-scripts */
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import { BaseLayout } from "../components/";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div>
      {/* Add Mantine Provider with provides global themes. */}
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-right" zIndex={2077}>
          <BaseLayout>
            <Component {...pageProps} />
          </BaseLayout>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  );
}
