import {
  Group,
  Affix,
  Card,
  Text,
  ColorSwatch,
  HoverCard,
  Center,
} from "@mantine/core";

interface LegendBoxProps {
  name: string;
  color: string;
  about: string;
}

const LegendBox = ({ name, color, about }: LegendBoxProps) => {
  return (
    <HoverCard width={500}>
      <HoverCard.Target>
        <Card p="xs" radius="md" withBorder style={{ cursor: "pointer" }}>
          <Center>
            <ColorSwatch color={color} />
          </Center>
          <Text
            style={{
              display: "table-caption",
              lineHeight: "0.85rem",
            }}
            size="xs"
            weight="bold"
            mt={4.5}
            ta="center"
          >
            {name}
          </Text>
        </Card>
      </HoverCard.Target>
      <HoverCard.Dropdown>
        <Text size="sm">{about}</Text>
      </HoverCard.Dropdown>
    </HoverCard>
  );
};

export const Legend = () => {
  const legendBoxes = [
    {
      name: "Good Client",
      color: "#80DC94",
      about:
        'A "node" is any instance of Ethereum client software that is connected to other computers also running Ethereum software, forming a network. A client is an implementation of Ethereum that verifies data against the protocol rules and keeps the network secure. The good clients in this network are doing their job properly.',
    },
    {
      name: "Evil Client",
      color: "#DE7474",
      about:
        "A malicious client is an implementation of Ethereum that chooses to fork into its own network with the goal of disrupting the main networks function. Once forked, the blockchain’s history is split with one version belonging to the good clients and the other beloning to the evil.  If there are more evil clients than good clients they can force the good clients into accepting their manipulated chain and rewrite the blockhain.",
    },
    {
      name: "Boot Node",
      color: "#4964F5",
      about:
        'A "node" is any instance of Ethereum client software that is connected to other computers also running Ethereum software, forming a network. A bootnode can be used to initiate the discovery process when running a node. The endpoints of these nodes are recorded in the Ethereum source code which allows for a private network to form.',
    },
    {
      name: "RPC Node",
      color: "#DC80D8",
      about:
        'A "node" is any instance of Ethereum client software that is connected to other computers also running Ethereum software, forming a network. Remote procedure call (RPC) is a protocol that a program uses to request a service from a program located on another computer in a network without having to understand the network details. This node is responsible for handling all RPC calls to the network including the one’s you are making from this website.',
    },
  ];

  return (
    <Affix position={{ bottom: 20, left: 20 }}>
      <Group spacing="xs">
        {legendBoxes.map(({ name, color, about }, i) => {
          return <LegendBox key={i} name={name} color={color} about={about} />;
        })}
      </Group>
    </Affix>
  );
};
