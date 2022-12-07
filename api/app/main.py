from fastapi import FastAPI, WebSocket
from typing import Union
from app import node_control
from app import attack
from fastapi.encoders import jsonable_encoder
import json
app = FastAPI()

CONTROL = node_control.Control()


@app.get("/")
async def read_root():
    nodes = CONTROL.fetchNodes()
    return_val = {}
    dict_names = ["miners", "rpcs", "boots"]
    for name in dict_names:
        list = []
        for node in range(len(nodes[name])):
            list.append(nodes["miners"][node].id)
        return_val[name] = list
    return jsonable_encoder(return_val)


@app.get("/miners")
async def read_root():
    nodes = CONTROL.fetchNodes()
    return_val = {}
    for node in nodes["miners"]:
        return_val[node.name] = node.status
    return return_val


@app.get("/rpcs")
async def read_root():
    nodes = CONTROL.fetchNodes()
    return_val = {}
    for node in nodes["rpcs"]:
        return_val[node.name] = node.status
    return return_val


@app.get("/boots")
async def read_root():
    nodes = CONTROL.fetchNodes()
    return_val = {}
    for node in nodes["boots"]:
        return_val[node.name] = node.status
    return return_val


@app.get("/logs/{miner_num}")
async def read_item(miner_num: int):
    nodes = CONTROL.fetchNodes()
    miner = nodes["miners"][miner_num]
    name = miner.name
    logs = str(str(jsonable_encoder(miner.logs(tail=10)))).split("\n")
    return jsonable_encoder(logs)


@app.get("/nodes")
async def read_item():
    nodes = CONTROL.fetchPeers()
    return jsonable_encoder(nodes)


@app.get("/nodes/configs")
async def read_item():
    nodes = CONTROL.fetchNodeConfigs()
    return jsonable_encoder(nodes)


@app.get("/attack")
async def read_item():
    node = attack.attack()
    return node
