from fastapi import FastAPI
from typing import Union
import node_control
import json
from fastapi.encoders import jsonable_encoder
import re
app = FastAPI()

CONTROL = node_control.Control()


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


@app.get("/logs/{item_id}")
async def read_item(item_id: int):
    nodes = CONTROL.fetchNodes()
    miner = nodes["miners"][item_id]
    name = miner.name
    logs = str(str(jsonable_encoder(miner.logs(tail=10)))).split("\n")
    return jsonable_encoder(logs)
