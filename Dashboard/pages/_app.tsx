/* eslint-disable @next/next/no-sync-scripts */
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import Head from "next/head";
import { BaseLayout } from "../components/";

// Simulate();

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <div>
      <Head>
        <title>Page title</title>
        {/* <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        /> */}
      </Head>
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
