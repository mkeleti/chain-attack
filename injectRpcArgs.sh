#!/bin/bash
docker exec RPC-Node geth attach /root/.ethereum/geth.ipc --exec "loadScript('/root/preload.js')"
run_attack() {
  echo "stop miner"
  docker exec $1 geth attach /root/.ethereum/geth.ipc --exec "miner.stop()"
  sleep 1
  docker exec $1 killall -HUP geth
  docker exec $1 geth removedb
  case $1 in
  Miner-Node)
    docker exec --privileged $1 geth --bootnodes "enode://43974299a4c52b220d8eed430a7ed1479f29548041e3ca67ddc1a4886835878c174d45dfd9e73ebd4901e8071c5bb19003f52e4e408e8ec5ce350f8f74a335a8@255.255.255.242:30301, enode://8a9f6e0f6e579e2eda70f8022021ecace552268db2eb6f9cd2fd29aee9d3a2e2c6a622fe6fefa83f41cd5a9fbf85b9b7e7ff696c3df72443b258a0cf51086555@255.255.255.243:30304" --nodekey=/root/miner.txt --unlock 0x3bcf84dd3ee4c8e3d99bdf37a6ce32a7562c93bf --mine --password /root/.ethereum/password.txt --networkid=314159 --netrestrict="255.255.255.248/28" --port 30305 --nat extip:"255.255.255.244"
    ;;
  Miner-Node-2)
    docker exec $1 geth --bootnodes "enode://43974299a4c52b220d8eed430a7ed1479f29548041e3ca67ddc1a4886835878c174d45dfd9e73ebd4901e8071c5bb19003f52e4e408e8ec5ce350f8f74a335a8@255.255.255.242:30301, enode://32550d2084b947c7dd7500f8f0e2dc47b8ca5cdab07a56c3535c24624767f12bbd37b4e6eca391f406debebede289c7403c675f7c3143243419e82fc39778899@255.255.255.244:30305, enode://8a9f6e0f6e579e2eda70f8022021ecace552268db2eb6f9cd2fd29aee9d3a2e2c6a622fe6fefa83f41cd5a9fbf85b9b7e7ff696c3df72443b258a0cf51086555@255.255.255.243:30304" --unlock 0xe1f5c19a40c4cc55dd5b98116a05d342da9064b3 --mine --miner.etherbase 0xe1f5c19a40c4cc55dd5b98116a05d342da9064b3 --password /root/.ethereum/password.txt --networkid=314159 --netrestrict="255.255.255.248/28" --port 30306 --nat extip:"255.255.255.245"
    ;;
  *)
    echo "none"
    ;;
  esac
  echo "import"
  docker exec $1 geth attach /root/.ethereum/geth.ipc --exec "admin.importChain('/root/backups/4')"

}
run_attack Miner-Node && run_attack Miner-Node-2
