#!/bin/bash
set -e

PROJECT=$1
cd ${PROJECT} && npm run dev && cd -