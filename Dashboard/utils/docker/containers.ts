'use server'
import Docker from "dockerode";
import { Container, ContainerInfo, ExecCreateOptions } from "dockerode";

const docker = new Docker({socketPath: '/var/run/docker.sock'});


async function getContainers(type: "nodes" | "all"): Promise<Docker.ContainerInfo[]> {

  if (type == "nodes") {
    return docker.listContainers({filter: {ancestor: 'ethereum/}client-go:alltools-v1.10.1'}});
  }
  else if (type == "all") {
    return docker.listContainers().then((containers) => {return containers})
  }
}


const CreateContainers = (containers: ContainerInfo[]): Container[] => {
  let callContainers: Container[];
  Docker.Container
  containers.map((container) => 
  { callContainers.push(docker.getContainer(container.Id)) })
  return callContainers;
}

export const nodes = getContainers("nodes").then((nodes) => { 
  if (nodes != null) { 
    return CreateContainers(nodes)
  }
}).catch(error => console.log(error));


export const injectNodeCmd = (id: number, cmd: string) => {
  // let command = cmd.split(" ");
  return nodes.then((result) => {
    if (result) {
      return result;
    }
  }).then((containers) => {
    let execution: ExecCreateOptions = {
      Cmd: ["geth", "attach", "--exec", cmd, "geth.ipc"],
      WorkingDir: '/root/.ethereum'
    }
    return containers[id].exec(execution);
  })
}