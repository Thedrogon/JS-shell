#!/bin/sh
#
# Use this script to run your program LOCALLY.

set -e # Exit early if any commands fail

# Copied from .codecrafters/run.sh

exec node app/main.js "$@"
