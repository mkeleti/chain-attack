
FROM ethereum/client-go:v1.10.1

ARG ACCOUNT_PASSWORD

RUN --mount=type=bind,source=.../blockchain-docker/blockchain-data/keystore,target=/root/.ethereum/devchain/keystore:rw

COPY .../blockchain-docker/blockchain-data/keystore /root/.ethereum/keystore:rw

COPY .../blockchain-docker/config/rpc.txt /root/rpc.txt:ro

COPY .../blockchain-docker/blockchain-data/preload.js /root/preload.js:ro

COPY .../blockchain-docker/blockchain-data/backups /root/backups

COPY .../blockchain-docker/blockchain-data/password.txt /root/.ethereum/password.txt:ro

COPY .../blockchain-docker/config/miner.txt /root/miner.txt:ro

COPY genesis.json /tmp

RUN geth init /tmp/genesis.json



ENTRYPOINT ["geth"]
