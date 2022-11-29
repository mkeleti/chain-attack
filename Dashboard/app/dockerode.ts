import Dockerode from "dockerode";

export const dsckt = new Dockerode();

export async function nodeNumber(): Promise<{ nodes: number }> {
  const allContainers = await dsckt.listContainers();
  let node_number: number = allContainers.length;
  for (const container of allContainers) {
    if (!container.Image.includes("geth")) {
      node_number--;
    }
  }
  return { nodes: node_number };
}

export default function dockerode() {
  let x: number;

  nodeNumber().then((res) => {
    x = res.nodes;
  });
  return x;
}
