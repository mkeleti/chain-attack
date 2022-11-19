import {
  AppShell,
  Header,
  Footer,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core';

import React from 'react';
import { HeaderSimple } from './Header/header';
import { FooterCentered } from './Footer/footer';

const links = [{ link: '/', label: 'Visualizer' },
  { link: '/Blockscout', label: 'Blockscout' },
  { link: '/Attack', label: 'Attack' },
];
interface Props {
  children: React.ReactNode;
}
 // Configures the layout of the web application
const Layout: React.FC<Props> = ({ children }) => {
  const theme = useMantineTheme();

  return (
        <AppShell
          styles={{
            main: {
              background:
                        theme.colorScheme === 'dark'
                          ? theme.colors.dark[8]
                          : theme.colors.gray[0],
              padding: 0,
            },
          }}
          header={
                    <Header height="60">
                        <HeaderSimple links={links} />
                    </Header>
            }
        >
            <main>{children}</main>
        </AppShell>
  );
};

export default Layout;
