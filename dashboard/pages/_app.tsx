import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import { BaseLayout } from "../components";

import "./styles.css";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </MantineProvider>
  );
}
