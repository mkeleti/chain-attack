#!/bin/bash
# Start the ChainDashboard
pm2 start ecosystem.config.js -s
node server.js

