'use server'
import Dockerode from "dockerode";
import fs from 'fs';
var docker = new Dockerode()


function stopAll() {
docker.listContainers(function (err, containers) {
  containers.forEach(function (containerInfo) {
    docker.getContainer(containerInfo.Id).stop();
  });
});
}

export function listAll() {
  docker.listContainers(function (err, containers) {
    containers.forEach(function (containerInfo) {
      return containerInfo;
    });
  });
  }


