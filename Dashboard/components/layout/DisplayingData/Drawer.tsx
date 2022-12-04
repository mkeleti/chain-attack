import { useEffect, useState } from 'react';
import { Drawer, Text, Button, Group, useMantineTheme, Box, DefaultMantineColor, MantineSize  } from '@mantine/core';
import NextButton from './NextButton';
import { NodeDataDisplay } from './NodeDataDisplay';
import { ChainStatus } from './ChainStatus';


export const DataDrawer = () => {
  const [opened, setOpened] = useState(true);
  const theme = useMantineTheme();
  
  return (
    <>
      <Group position="center">
        <Button sx={style} onClick={() => setOpened(true)}>
        <Text size="lg" color="000000" weight="bold">View Data</Text>
        </Button>
      </Group>

      <Drawer
        position="right"   
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        style={drawerStyle}
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
        overlayOpacity={0.35}
      >
        {
            <div>
                <NextButton href="/blockscout" title="Blockchain Explorer" color="#8a9af3" size="md"></NextButton>
                <NextButton href="/attack" title="Initiate Attack" color="#f7d2d2" size="md"></NextButton>
                <NextButton href="/" title="View the Chain" color="#8a9af3" size="md"></NextButton>
                <NodeDataDisplay/>
                <ChainStatus/>
            </div>
        }
      </Drawer>

    
    </>
  );
}

const style = {
  size: "lg",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "violet",
  borderRadius: 10,
  borderWidth: 2,
  borderColor: "#000000",
  borderStyle: "solid",
  margin: 30,
};

const drawerStyle ={
  color: "violet"
}