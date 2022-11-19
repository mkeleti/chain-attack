# Import ethereum
FROM --platform=$BUILDPLATFORM ethereum/client-go:alltools-v1.10.1
# Accept account password as arg
ARG ACCOUNT_PASSWORD
# Copy genesis.json to /tmp
RUN apk add --update --no-cache openssh docker docker-compose iptables
RUN echo 'PasswordAuthentication yes' >> /etc/ssh/sshd_config
RUN adduser -h /home/geth -s /bin/sh -D geth
RUN echo -n 'geth:geth' | chpasswd
# 
RUN ssh-agent
# Copy directory of keys to the geth docker container
COPY blockchain-data/keystore /.ethereum/devchain/keystore
# Copy directory of keys to the geth docker container
COPY blockchain-data/keystore /.ethereum/keystore
# Copy the preload.js file to the geth docker container
COPY blockchain-data/preload.js /root/preload.js
# Copy the backup directory to the geth docker container
RUN --mount=type=bind,source="blockchain-data/backups",target="/root/backups"
# Copy bootnode.txt to the geth docker container
COPY config/bootnode.txt /root/bootnode.txt
# Copy bootnode address to the geth docker container
COPY config/bootnodeaddress.txt /root/bootnodeaddress.txt
# bootnode config being imported into container
COPY config/bootnode.toml /root/bootnode.toml

COPY config/rpc.txt /root/rpc.txt

COPY blockchain-data/password.txt /root/password.txt

COPY config/miner.txt /root/miner.txt

COPY blockchain-data/password.txt /root/.ethereum/password.txt
# Open port 22 on TCP
EXPOSE 22/tcp
# Copy genesis.json to /tmp
COPY genesis.json /tmp
# Initialize the genesis chain directory
RUN geth init /tmp/genesis.json

COPY start.sh /root/start.sh
# Copy the start script to root
# COPY standalone-container/start.sh /root/start.sh
# Provide executing privelages to /root/start.sh
# RUN chmod 755 /root/start.sh

# Enter file at startscript
ENTRYPOINT ["geth"]
