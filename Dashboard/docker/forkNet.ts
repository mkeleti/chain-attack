import Docker from "dockerode";

var docker = new Docker({socketPath: '/var/run/docker.sock'});

var container = docker.getContainer('geth-miner');

export function inspect() {
  container.inspect(function (err, data) {
    console.log(data);
  });
}