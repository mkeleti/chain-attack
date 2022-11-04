#!/bin/bash
if [ -x "$(command -v docker)" ]; then
    echo "Updating git repo"
    git pull
    git submodule update
    echo "Stopping any currently running containers"
    docker compose down
    echo "Building conntainers"
    docker compose build
    echo "Starting Docker Containers"
    docker compose up -d
    echo "Opening website"
    python -m webbrowser -n "http://127.0.0.1:3000"
    echo "Pausing & Unpausing miners for correct sync"
    sleep 10
    docker compose restart geth-signer-2
    echo "Done! You can access the website at http://127.0.0.1:3000"
    cd ChainDashboard
    yarn transact
    read -p "Press Enter to stop the containers" </dev/tty
    yarn untransact
    cd ..
    docker compose down
    echo "Goodbye!"
else
    echo "Install docker to run: https://www.docker.com"
fi