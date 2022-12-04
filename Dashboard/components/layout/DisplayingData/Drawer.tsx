import { useEffect, useState } from 'react';
import { Drawer, Button, Group, useMantineTheme, Box, DefaultMantineColor, MantineSize  } from '@mantine/core';
import NextButton from './NextButton';
import { NodeDataDisplay } from './NodeDataDisplay';


export const DataDrawer = () => {
  const [opened, setOpened] = useState(true);
  const theme = useMantineTheme();
  
  return (
    <>
      <Drawer
        position="right"   
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      >
        {
            <div>
                <NextButton href="/blockscout" title="Blockchain Explorer" color="violet" size="md"></NextButton>
                <NextButton href="/attack" title="Initiate Attack" color="pink" size="md"></NextButton>
                <NextButton href="/" title="View the Chain" color="violet" size="md"></NextButton>
                <NodeDataDisplay/>
            </div>
        }
      </Drawer>

      <Group position="center">
        <Button sx={{ margin: 30 }} onClick={() => setOpened(true)}>View Data</Button>
      </Group>

    
    </>
  );
}