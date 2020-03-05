#!/bin/bash
set -e

cd client && npm run build && cd -
cd server && npm run build && cd -