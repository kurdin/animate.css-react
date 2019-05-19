#!/bin/sh -e
export NODE_ENV=production
mkdir -p build/
babel src -d build