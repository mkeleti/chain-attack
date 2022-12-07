import { ResponsiveNetwork } from "@nivo/network";

interface Props {
  nodes: any;
}

export const NodeCluster = ({ nodes }: Props) => {
  const data = generateGraphData(nodes);

  return (
    <ResponsiveNetwork
      data={data}
      margin={{ top: 0, right: 5, bottom: 0, left: 0 }}
      linkDistance={function (e) {
        return e.distance;
      }}
      centeringStrength={1}
      repulsivity={31}
      nodeSize={function (n) {
        return n.size;
      }}
      activeNodeSize={function (n) {
        return 1.5 * n.size;
      }}
      nodeColor={function (e) {
        return e.color;
      }}
      nodeBorderWidth={1}
      nodeBorderColor={{
        from: "color",
        modifiers: [["darker", 0.8]],
      }}
      motionConfig="default"
      linkColor="#838996"
    />
  );
};
function generateGraphData(data: any) {
  const nodes = [];
  const links = [];

  for (const [id, link] of Object.entries(data.miners)) {
    nodes.push({
      id,
      height: 1,
      size: 36,
      color: "#80DC94",
    });
    (link as []).forEach((l) => {
      links.push({
        source: id,
        target: l,
        distance: 125,
      });
    });
  }
  for (const [id, link] of Object.entries(data.rpcs)) {
    nodes.push({
      id,
      height: 1,
      size: 36,
      color: "#DC80D8",
    });
    (link as []).forEach((l) => {
      links.push({
        source: id,
        target: l,
        distance: 100,
      });
    });
  }
  for (const [id] of Object.entries(data.boots)) {
    nodes.push({
      id,
      height: 1,
      size: 36,
      color: "#4964F5",
    });
  }

  return { nodes, links };
}
