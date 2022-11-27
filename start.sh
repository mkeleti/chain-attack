#!/bin/bash

trap_ctrlc() {
    docker compose down
    echo "Goodbye!"
    kill -9 $(lsof -t -i:"3000")
    wait $(lsof -t -i:"3000")
    echo -e "\n\ntrap_ctrlc\n\n"
}

if [ -x "$(command -v docker)" ]; then
    echo "Updating git repo"
    git pull
    echo "Stopping any currently running containers"
    docker compose down
    echo "Building containers"
    docker compose build
    echo "Starting Docker Containers"
    docker compose up -d
    echo "Pausing & Unpausing miners for correct sync"
    sleep 10
    docker compose restart geth-signer-2
    docker compose restart geth-signer-3
    echo "Done! You can access the website at http://127.0.0.1:3000"
    # ./injectRpcArgs.sh # 51 Attack
    cd Dashboard || exit
    yarn install
    # yarn build
    echo "Opening website, press CTRL+C to stop"
    trap trap_ctrlc INT
    # yarn start
    yarn dev
else
    echo "Install docker to run: https://www.docker.com"
fi